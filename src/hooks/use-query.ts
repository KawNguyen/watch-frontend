import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type QueryKey = string | (string | number | boolean | null | undefined)[];

type QueryStatus = "idle" | "loading" | "error" | "success";

type UseQueryOptions<TData, TError = Error> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean; // Thêm option mới
  retry?: number | boolean;
  retryDelay?: number | ((attempt: number) => number);
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData | undefined, error: TError | null) => void;
  initialData?: TData;
};

type UseQueryResult<TData, TError = Error> = {
  data: TData | undefined;
  status: QueryStatus;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isIdle: boolean;
  error: TError | null;
  refetch: () => Promise<TData>;
};

// Theo dõi các promise đang chạy để ngăn chặn trùng lặp
const pendingPromises = new Map<string, Promise<any>>();

// Cache và thời gian để quản lý vòng đời
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiryTimeout?: NodeJS.Timeout;
}

export const queryCache = new Map<string, CacheEntry<any>>();

// Tạo cache key từ queryKey
export const createCacheKey = (key: QueryKey): string => {
  return typeof key === "string" ? key : JSON.stringify(key);
};

// Hàm để clear cache theo key
export const clearQueryCache = (queryKey?: QueryKey) => {
  if (queryKey) {
    const key = createCacheKey(queryKey);
    const entry = queryCache.get(key);
    if (entry?.expiryTimeout) {
      clearTimeout(entry.expiryTimeout);
    }
    queryCache.delete(key);
  } else {
    // Clear toàn bộ cache
    queryCache.forEach((entry) => {
      if (entry.expiryTimeout) {
        clearTimeout(entry.expiryTimeout);
      }
    });
    queryCache.clear();
  }
};

export function useQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  const {
    queryKey,
    queryFn,
    enabled = true,
    staleTime = 0,
    cacheTime = 5 * 60 * 1000,
    refetchOnWindowFocus = true,
    refetchOnMount = false, // Thêm default value
    retry = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    onSettled,
    initialData,
  } = options;

  const cacheKey = useMemo(() => createCacheKey(queryKey), [queryKey]);

  const [state, setState] = useState<{
    data: TData | undefined;
    status: QueryStatus;
    error: TError | null;
    isFetching: boolean;
  }>(() => {
    const cached = queryCache.get(cacheKey);
    return {
      data: cached?.data ?? initialData,
      status: cached?.data || initialData ? "success" : "idle",
      error: null,
      isFetching: false,
    };
  });

  const mountedRef = useRef(true);
  const stableQueryFn = useRef(queryFn);
  const stableOnSuccess = useRef(onSuccess);
  const stableOnError = useRef(onError);
  const stableOnSettled = useRef(onSettled);

  useEffect(() => {
    stableQueryFn.current = queryFn;
    stableOnSuccess.current = onSuccess;
    stableOnError.current = onError;
    stableOnSettled.current = onSettled;
  }, [queryFn, onSuccess, onError, onSettled]);

  const setCacheEntry = useCallback(
    (key: string, data: TData) => {
      const oldEntry = queryCache.get(key);
      if (oldEntry?.expiryTimeout) {
        clearTimeout(oldEntry.expiryTimeout);
      }

      const expiryTimeout = setTimeout(() => {
        queryCache.delete(key);
      }, cacheTime);

      queryCache.set(key, {
        data,
        timestamp: Date.now(),
        expiryTimeout,
      });
    },
    [cacheTime]
  );

  const fetchData = useCallback(
    async (forceRefresh = false): Promise<TData> => {
      if (!enabled && !forceRefresh) {
        return Promise.reject(new Error("Query is disabled"));
      }

      setState((prev) => ({
        ...prev,
        isFetching: true,
        status: prev.data === undefined ? "loading" : prev.status,
      }));

      const cached = queryCache.get(cacheKey);
      const isStale =
        !cached || (staleTime > 0 && Date.now() - cached.timestamp > staleTime);

      if (cached && !isStale && !forceRefresh) {
        setState((prev) => ({
          ...prev,
          data: cached.data,
          status: "success",
          isFetching: false,
        }));
        return cached.data;
      }

      let promise = pendingPromises.get(cacheKey);

      if (!promise || forceRefresh) {
        promise = (async () => {
          let retryCount = 0;
          const maxRetries =
            typeof retry === "boolean" ? (retry ? 3 : 0) : retry;
          const getDelay =
            typeof retryDelay === "function"
              ? retryDelay
              : () => retryDelay as number;

          while (true) {
            try {
              const result = await stableQueryFn.current();

              setCacheEntry(cacheKey, result);

              if (mountedRef.current) {
                setState({
                  data: result,
                  status: "success",
                  error: null,
                  isFetching: false,
                });
              }

              stableOnSuccess.current?.(result);
              stableOnSettled.current?.(result, null);

              pendingPromises.delete(cacheKey);

              return result;
            } catch (err) {
              if (retryCount >= maxRetries) {
                pendingPromises.delete(cacheKey);

                if (mountedRef.current) {
                  setState({
                    data: state.data,
                    status: "error",
                    error: err as TError,
                    isFetching: false,
                  });
                }

                stableOnError.current?.(err as TError);
                stableOnSettled.current?.(state.data, err as TError);

                throw err;
              }

              // Thử lại
              const delay = getDelay(retryCount);
              await new Promise((resolve) => setTimeout(resolve, delay));
              retryCount++;
            }
          }
        })();

        pendingPromises.set(cacheKey, promise);
      }

      try {
        return await promise;
      } catch (error) {
        throw error;
      }
    },
    [cacheKey, enabled, staleTime, retry, retryDelay, setCacheEntry, state.data]
  );

  // Refetch function
  const refetch = useCallback((): Promise<TData> => {
    return fetchData(true);
  }, [fetchData]);

  // Fetch initial data
  useEffect(() => {
    if (enabled) {
      const cached = queryCache.get(cacheKey);
      const shouldFetch = refetchOnMount || !cached;
      if (shouldFetch) {
        fetchData(false).catch(() => {});
      }
    }
  }, [enabled, fetchData, cacheKey, refetchOnMount]);

  // Handle window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const onFocus = () => {
      const cached = queryCache.get(cacheKey);
      const isStale =
        !cached || (staleTime > 0 && Date.now() - cached.timestamp > staleTime);

      if (isStale && enabled) {
        fetchData(false).catch(() => {});
      }
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [cacheKey, enabled, staleTime, refetchOnWindowFocus, fetchData]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const status = state.status;
  const isIdle = status === "idle";
  const isLoading = status === "loading";
  const isError = status === "error";
  const isSuccess = status === "success";

  return useMemo(
    () => ({
      data: state.data,
      status,
      isIdle,
      isLoading,
      isFetching: state.isFetching,
      isError,
      isSuccess,
      error: state.error,
      refetch,
    }),
    [state, status, isIdle, isLoading, isError, isSuccess, refetch]
  );
}
