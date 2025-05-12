import { order } from "@/api/order";
import { useQuery } from "../use-query";

export const useAllOrder = () => {
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: () => order.getAllOrders(),
    enabled: true,
    refetchOnMount: true,
  });
};

export const useOrderByUser = (userId: string) => {
  return useQuery({
    queryKey: ["ordersUserId", userId],
    queryFn: () => order.getOrdersByUserId(userId),
    enabled: !!userId,
    refetchOnMount: true,
    cacheTime: 0,
  });
};
