import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { createCacheKey, queryCache } from "./use-query";
type UseMutationOptions<TData, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onMutate?: (variables: TVariables) => void;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (
    data: TData | null,
    error: Error | null,
    variables: TVariables,
  ) => void;
  // Thêm queryKey để liên kết với cache của useQuery
  queryKey?: string | (string | number | boolean | null | undefined)[];
};

type UseMutationResult<TData, TVariables> = {
  mutate: (variables: TVariables) => Promise<void>;
  data: TData | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  reset: () => void;
};

export function useMutation<TData, TVariables>(
  options: UseMutationOptions<TData, TVariables>,
): UseMutationResult<TData, TVariables> {
  const { mutationFn, onMutate, onSuccess, onError, onSettled, queryKey } =
    options;

  const callbackRefs = useRef({
    mutationFn,
    onMutate,
    onSuccess,
    onError,
    onSettled,
  });

  useEffect(() => {
    callbackRefs.current = {
      mutationFn,
      onMutate,
      onSuccess,
      onError,
      onSettled,
    };
  }, [mutationFn, onMutate, onSuccess, onError, onSettled]);

  const [state, setState] = useState<{
    data: TData | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    data: null,
    isLoading: false,
    error: null,
  });

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const mutate = useCallback(
    async (variables: TVariables): Promise<void> => {
      if (!mountedRef.current) return;

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        callbackRefs.current.onMutate?.(variables);

        const result = await callbackRefs.current.mutationFn(variables);

        if (!mountedRef.current) return;

        setState((prev) => ({
          ...prev,
          data: result,
          isLoading: false,
        }));

        // Cập nhật cache của useQuery nếu có queryKey
        if (queryKey) {
          const cacheKey = createCacheKey(queryKey);
          const oldEntry = queryCache.get(cacheKey);
          if (oldEntry?.expiryTimeout) {
            clearTimeout(oldEntry.expiryTimeout);
          }

          // Cập nhật cache với dữ liệu mới
          queryCache.set(cacheKey, {
            data: result,
            timestamp: Date.now(),
            expiryTimeout: setTimeout(
              () => {
                queryCache.delete(cacheKey);
              },
              5 * 60 * 1000,
            ), // Sử dụng thời gian mặc định 5 phút
          });
        }

        callbackRefs.current.onSuccess?.(result, variables);
        callbackRefs.current.onSettled?.(result, null, variables);

        return;
      } catch (err: any) {
        if (!mountedRef.current) return;

        setState((prev) => ({
          ...prev,
          error: err,
          isLoading: false,
        }));

        callbackRefs.current.onError?.(err, variables);

        callbackRefs.current.onSettled?.(null, err, variables);
      }
    },
    [queryKey],
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
    });
  }, []);

  return useMemo(
    () => ({
      mutate,
      data: state.data,
      isLoading: state.isLoading,
      isError: !!state.error,
      error: state.error,
      reset,
    }),
    [mutate, state.data, state.isLoading, state.error, reset],
  );
}
