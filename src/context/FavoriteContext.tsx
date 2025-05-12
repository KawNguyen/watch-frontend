import { createContext, useContext, useEffect, useState } from "react";
import { useUserFavorite } from "@/hooks/use-api-query/useFavorite";
import { useMutation } from "@/hooks/use-mutation";
import { favorite } from "@/api/favorite";
import { toast } from "sonner";
import { useUserContext } from "./UserContext";

interface FavoriteContextProps {
  data: any;
  isLoading: boolean;
  favoriteCount: number;
  refetchFavorite: () => void;
  addToFavorite: (watchId: string) => void;
  removeFromFavorite: (watchId: string) => void;
  isLoadingAddToFavorite: boolean;
  isLoadingRemoveFromFavorite: boolean;
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(
  undefined,
);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useUserContext();
  const { data: favoriteData, isLoading, refetch } = useUserFavorite(userId);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    if (favoriteData?.data?.items) {
      setFavoriteCount(favoriteData?.data?.items.length);
    } else {
      setFavoriteCount(0);
    }
  }, [favoriteData]);

  const mutateAddToFavorite = useMutation({
    mutationFn: (variables: { watchId: string }) =>
      favorite.addToFavorite(userId, variables.watchId),
    onSuccess: () => {
      toast.success("Product added to favorite successfully");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const addToFavorite = (watchId: string) => {
    if(!userId)
    {
      toast.error("Please login to add product to favorite");
      return;
    }
    mutateAddToFavorite.mutate({ watchId });
  };

  const mutateDeleteFavorite = useMutation({
    mutationFn: (watchId: string) =>
      favorite.removeFromFavorite(userId, watchId),
    onSuccess: () => {
      toast.success("Remove product successfully");
      refetch();
    },
  });

  const removeFromFavorite = (watchId: string) => {
    mutateDeleteFavorite.mutate(watchId);
  };

  return (
    <FavoriteContext.Provider
      value={{
        data: favoriteData,
        isLoading: isLoading,
        favoriteCount,
        refetchFavorite: refetch,
        addToFavorite,
        removeFromFavorite,
        isLoadingAddToFavorite: mutateAddToFavorite.isLoading,
        isLoadingRemoveFromFavorite: mutateAddToFavorite.isLoading,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useFavoriteContext must be used within a FavoriteProvider",
    );
  }
  return context;
};
