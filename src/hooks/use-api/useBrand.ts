import { useState } from "react";
import { brand } from "@/api/brand";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading";

export const useBrand = () => {
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState([]);

  const getAllBrands = async () => {
    try {
      startLoading("getAllBrands");
      setError(null);
      const res = await brand.getAll();
      setBrands(res.data.items);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch brands");
    } finally {
      stopLoading("getAllBrands");
    }
  };

  const getBrandById = async (id: number) => {
    try {
      startLoading("getBrandById");
      setError(null);
      const data = await brand.getById(id);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch brand");
    } finally {
      stopLoading("getBrandById");
    }
  };

  const createBrand = async (name: string, country: string, logo: string) => {
    try {
      startLoading("createBrand");
      setError(null);
      const data = await brand.create(name, country, logo);

      if (!data || data.status >= 400) {
        throw new Error(data.message || "Failed to create brand");
      }

      await getAllBrands();
      toast({
        title: "Success",
        description: "Brand created successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to create brand";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      stopLoading("createBrand");
    }
  };

  const updateBrand = async (id: number, name: string, country: string) => {
    try {
      startLoading("updateBrand");
      setError(null);
      const data = await brand.update(id, name, country);
      await getAllBrands();
      toast({
        title: "Success",
        description: "Brand updated successfully",
        className: "bg-green-500 text-white border-none",
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
      stopLoading("updateBrand");
    }
  };

  const deleteBrand = async (id: number) => {
    try {
      startLoading("deleteBrand");
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
      stopLoading("deleteBrand");
    }
  };

  const search = async (query: string) => {
    try {
      startLoading("search");
      setError(null);
      const res = await brand.search(query);
      return res.data.items;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to search brand");
    } finally {
      stopLoading("search");
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
