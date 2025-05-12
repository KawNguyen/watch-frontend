import { favorite } from "@/api/favorite";
import { useQuery } from "../use-query";

export const useUserFavorite = (userId: string) => {
  return useQuery({
    queryKey: ["favoriteUser"],
    queryFn: () => favorite.getUserFavorite(userId),
    enabled: !!userId,
    staleTime: 1000 * 60,
  });
};
