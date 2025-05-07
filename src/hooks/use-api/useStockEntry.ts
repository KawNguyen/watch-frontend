import { useState } from "react";
import { stockEntry } from "@/api/stockEntry";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading";

export const useStockEntry = () => {
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [stockEntries, setStockEntries] = useState([]);

  const getAllStockEntries = async () => {
    const key = "getAll";
    startLoading(key);
    try {
      setError(null);
      const res = await stockEntry.getAll();
      setStockEntries(res.data.items);
      return res.data.items;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch stock entries");
    } finally {
      stopLoading(key);
    }
  };

  const getStockEntryById = async (id: string) => {
    const key = "getById";
    startLoading(key);
    try {
      setError(null);
      const data = await stockEntry.getById(id);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch stock entry");
    } finally {
      stopLoading(key);
    }
  };

  const createStockEntry = async (data: {
    items: { watchId: string; quantity: number; price: number }[];
    addedById?: string;
  }) => {
    const key = "create";
    startLoading(key);
    try {
      setError(null);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const result = await stockEntry.create({ ...data, addedById: user.id });
      toast({
        title: "Success",
        description: "Stock entry created successfully",
        className: "bg-green-500 text-white border-none",
      });
      return result;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create stock entry";
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

  return {
    stockEntries,
    error,
    isLoading,
    getAllStockEntries,
    getStockEntryById,
    createStockEntry,
  };
};
