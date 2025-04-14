import { useState } from "react";
import { watch } from "@/api/watch";
import { useToast } from "./use-toast";

interface WatchData {
  name: string;
  description: string;
  price: number;
  gender: 'MALE' | 'FEMALE' | 'UNISEX';
  brandId: string;
  materialId: string;
  bandMaterialId: string;
  movementId: string;
  stock: number;
  diameter: number;
  waterResistance: number;
  warranty: number;
  images: { url: string }[];
}

interface UpdateWatchData extends WatchData {
  id: string;
}

export const useWatch = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watches, setWatches] = useState([]);

  const getAllWatches = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await watch.getAll();
      setWatches(data);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch watches");
    } finally {
      setIsLoading(false);
    }
  };

  const getWatchById = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await watch.getById(id);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch watch");
    } finally {
      setIsLoading(false);
    }
  };

  const createWatch = async (watchData: WatchData) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const updateWatch = async (watchData: UpdateWatchData) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await watch.update(watchData);
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
      setIsLoading(false);
    }
  };

  const deleteWatch = async (id: string) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return {
    watches,
    isLoading,
    error,
    getAllWatches,
    getWatchById,
    createWatch,
    updateWatch,
    deleteWatch,
  };
};