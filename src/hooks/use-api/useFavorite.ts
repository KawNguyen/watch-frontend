import { useState } from "react";
import { favorite } from "@/api/favorite";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading";
import { useAuth } from "./useAuth";
import { useGlobalStore } from "@/store/useGlobalStore";

export const useFavorite = () => {
  const { getUser } = useAuth();
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const userId = getUser()?.id;
  const updatedFavoriteCount = useGlobalStore(
    (state) => state.updateFavoriteCount,
  );

  const getUserFavorite = async () => {
    const key = "getUserFavorite";
    startLoading(key);
    try {
      setError(null);
      const res = await favorite.getUserFavorite(userId);
      await updatedFavoriteCount(userId);
      setFavorites(res.data.items);
      return res.data.items;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch favorites");
      toast({
        variant: "destructive",
        title: "Error",
        description: err.response?.data?.message || "Failed to fetch favorites",
        className: "bg-red-500 text-white border-none",
      });
      throw err;
    } finally {
      stopLoading(key);
    }
  };

  const addToFavorite = async (watchId: string) => {
    const key = "addToFavorite";
    startLoading(key);
    try {
      setError(null);
      const res = await favorite.addToFavorite(userId, watchId);
      await updatedFavoriteCount(userId);
      toast({
        title: "Success",
        description: "Added to favorites",
        className: "bg-green-500 text-white border-none",
      });
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add to favorites");
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err.response?.data?.message || "Failed to add to favorites",
        className: "bg-red-500 text-white border-none",
      });
      throw err;
    } finally {
      stopLoading(key);
    }
  };

  const removeFromFavorite = async (watchId: string) => {
    const key = "removeFromFavorite";
    startLoading(key);
    try {
      setError(null);
      const data = await favorite.removeFromFavorite(userId, watchId);
      toast({
        title: "Success",
        description: "Removed from favorites",
        className: "bg-green-500 text-white border-none",
      });
      await updatedFavoriteCount(userId);

      return data;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to remove from favorites",
      );
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err.response?.data?.message || "Failed to remove from favorites",
        className: "bg-red-500 text-white border-none",
      });
      throw err;
    } finally {
      stopLoading(key);
    }
  };

  return {
    favorites,
    error,
    isLoading,
    getUserFavorite,
    addToFavorite,
    removeFromFavorite,
  };
};
