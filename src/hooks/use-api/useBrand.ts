import { useState } from "react";
import { brand } from "@/api/brand";
import { useToast } from "../use-toast";

export const useBrand = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState([]);

  const getAllBrands = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await brand.getAll();
      setBrands(res.data.items);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch brands");
    } finally {
      setIsLoading(false);
    }
  };

  const getBrandById = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await brand.getById(id);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch brand");
    } finally {
      setIsLoading(false);
    }
  };

  const createBrand = async (name: string, country: string, logo: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await brand.create(name, country, logo);
      await getAllBrands();
      toast({
        title: "Success",
        description: "Brand created successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create brand";
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

  const updateBrand = async (id: number, name: string, country: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await brand.update(id, name, country);
      await getAllBrands();
      toast({
        title: "Success",
        description: "Brand updated successfully",
        className: "bg-green-500 text-white border-none top-0 ư",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update brand";
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

  const deleteBrand = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await brand.delete(id);
      await getAllBrands();
      toast({
        title: "Success",
        description: "Brand deleted successfully",
        className: "bg-green-500 text-white border-none",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete brand";
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

  const search = async (query: string) => {
    try {
      const res = await brand.search(query);
      return res.data.items;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to search brand");
    }
  };

  return {
    brands,
    isLoading,
    error,
    search,
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
  };
};
