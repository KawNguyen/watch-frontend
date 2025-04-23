import { useState } from "react";
import { watch } from "@/api/watch";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading";

export const useWatch = () => {
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [watches, setWatches] = useState([]);

  const getAllWatches = async () => {
    const key = "getAll";
    startLoading(key);
    try {
      setError(null);
      const res = await watch.getAll();
      setWatches(res.data.items);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch watches");
    } finally {
      stopLoading(key);
    }
  };

  const getWatchById = async (id: string) => {
    const key = "getById";
    startLoading(key);
    try {
      setError(null);
      const res = await watch.getById(id);
      return res.data.item;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch watch");
    } finally {
      stopLoading(key);
    }
  };

  const createWatch = async (watchData: WatchData) => {
    const key = "create";
    startLoading(key);
    try {
      setError(null);
      const data = await watch.create(watchData);
      await getAllWatches();
      toast({
        title: "Success",
        description: "Watch created successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to create watch";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      stopLoading(key);
    }
  };

  const updateWatch = async (id: string, watchData: WatchData) => {
    const key = "update";
    startLoading(key);
    try {
      setError(null);
      const data = await watch.update(id, watchData);
      await getAllWatches();
      toast({
        title: "Success",
        description: "Watch updated successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update watch";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      stopLoading(key);
    }
  };

  const deleteWatch = async (id: string) => {
    const key = "delete";
    startLoading(key);
    try {
      setError(null);
      await watch.delete(id);
      await getAllWatches();
      toast({
        title: "Success",
        description: "Watch deleted successfully",
        className: "bg-green-500 text-white border-none",
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to delete watch";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      stopLoading(key);
    }
  };

  const searchWatches = async (query: string) => {
    const key = "search";
    startLoading(key);
    try {
      const data = await watch.search(query);
      return data;
    } catch (err) {
      setError("Failed to search watches");
      throw err;
    } finally {
      stopLoading(key);
    }
  };

  const getWatchesByBrand = async (brandId: string) => {
    const key = "getByBrand";
    startLoading(key);
    try {
      const res = await watch.getByBrand(brandId);
      return res.data.items;
    } catch (err) {
      setError("Failed to get watches by brand");
      throw err;
    } finally {
      stopLoading(key);
    }
  };

  return {
    watches,
    error,
    isLoading,
    getAllWatches,
    getWatchById,
    createWatch,
    updateWatch,
    deleteWatch,
    searchWatches,
    getWatchesByBrand,
  };
};
