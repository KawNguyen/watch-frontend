import { cart } from "@/api/cart";
import { useQuery } from "../use-query";

export const useUserCart = (userId: string) => {
  return useQuery({
    queryKey: ["userCart", userId],
    queryFn: () => cart.getUserCart(userId),
    enabled: !!userId,
    staleTime: 1000 * 60,
  });
};
