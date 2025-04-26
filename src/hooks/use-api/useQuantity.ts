import { useState } from "react";
import { getQuantity } from "@/api/quantity";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading";

export const useQuantity = () => {
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const getAllQuantities = async (page: number, limit: number) => {
    const key = "getAll";
    startLoading(key);
    try {
      setError(null);
      const response = await getQuantity.getAll(page, limit);
      setQuantities(response.data.items);
      setTotalPages(response.meta.totalPages);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch quantities");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch quantities",
      });
    } finally {
      stopLoading(key);
    }
  };

  const getQuantityById = async (id: string) => {
    const key = "getById";
    startLoading(key);
    try {
      setError(null);
      const response = await getQuantity.getById(id);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch quantity");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch quantity",
      });
    } finally {
      stopLoading(key);
    }
  };

  const searchQuantities = async (
    query: string,
    page: number,
    limit: number
  ) => {
    const key = "search";
    startLoading(key);
    try {
      setError(null);
      const response = await getQuantity.search(query, page, limit);
      return response.data.items;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to search quantities");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to search quantities",
      });
    } finally {
      stopLoading(key);
    }
  };

  return {
    quantities,
    totalPages,
    error,
    isLoading,
    getAllQuantities,
    getQuantityById,
    searchQuantities,
  };
};
