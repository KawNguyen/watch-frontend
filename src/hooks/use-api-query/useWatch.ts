import { useQuery } from "@/hooks/use-query";
import { watch } from "@/api/watch";
import { toast } from "sonner";
import { useMutation } from "../use-mutation";
import { queryClient } from "@/lib/queryClient";
export const useWatchesList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["watchesList", page, limit],
    queryFn: () => watch.getAll(page, limit),
    enabled: !!page,
    refetchOnMount: true,
    // cacheTime: 0,
  });
};

export const useWatchesFilter = (filters: FilterParams) => {
  return useQuery({
    queryKey: ["watchesFilter", filters.page, JSON.stringify(filters)],
    queryFn: () => watch.getByFilter(filters),
    enabled: !!filters,
    refetchOnMount: true,
    // cacheTime: 0,
  });
};

export const useWatchById = (watchId: string ) => {
  return useQuery({
    queryKey: [`watch:${watchId}`],
    queryFn: () => watch.getById(watchId),
    enabled: !!watchId,
    refetchOnMount: true,
    // cacheTime: 0,
  });
};

export const useWatchByBrand = (brandId: string) => {
  return useQuery({
    queryKey: ["watchByBrand", brandId],
    queryFn: () => watch.getByBrand(brandId, 1, 4),
    enabled: !!brandId,
  });
};

export const useWatchByMovement = (
  movement: string,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["watchByMovement", movement],
    queryFn: () => watch.getByMovement(movement, page, limit),
    enabled: !!movement,
  });
};

export const useSearchWatch = (searchTerm: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["searchWatch", searchTerm],
    queryFn: () => watch.search(searchTerm, 1, 12),
    enabled: enabled && !!searchTerm.trim() && searchTerm.length >= 1,
  });
};


export const useAddWatch = () => {
  return useMutation({
    mutationFn: (data: WatchData) => watch.create(data),
    onSuccess: () => {
      // Invalidate tất cả các pattern liên quan
      queryClient.invalidateQueries("watchesList");
      queryClient.invalidateQueries("watchesFilter");
      queryClient.invalidateQueries("watchByBrand");
      queryClient.invalidateQueries("watchByMovement");
      queryClient.invalidateQueries("searchWatch");
      toast.success("Watch added successfully");
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to add watch");
    },
  });
};

export const useUpdateWatch = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: WatchData }) =>
      watch.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(`watch:${id}`);
      queryClient.invalidateQueries("watchesList");
      queryClient.invalidateQueries("watchesFilter");
      queryClient.invalidateQueries("watchByBrand");
      queryClient.invalidateQueries("watchByMovement");
      queryClient.invalidateQueries("searchWatch");
      toast.success("Watch updated successfully");
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update watch");
    },
  });
};

export const useDeleteWatch = () => {
  return useMutation({
    mutationFn: (id: string) => watch.delete(id),
    onSuccess: (_, id) => {
      // Invalidate tất cả các pattern liên quan
      queryClient.removeQueries(`watch:${id}`);
      queryClient.invalidateQueries("watchesList");
      queryClient.invalidateQueries("watchesFilter");
      queryClient.invalidateQueries("watchByBrand");
      queryClient.invalidateQueries("watchByMovement");
      queryClient.invalidateQueries("searchWatch");
      toast.success("Watch deleted successfully");
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to delete watch");
    },
  });
};
