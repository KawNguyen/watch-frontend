import { useState } from "react";
import { bandMaterial } from "@/api/bandMaterial";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading";

export const useBandMaterial = () => {
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [bandMaterials, setBandMaterials] = useState([]);

  const getAllBandMaterials = async () => {
    try {
      startLoading("getAllBandMaterials");
      setError(null);
      const res = await bandMaterial.getAll();
      setBandMaterials(res.data.items);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch band materials");
    } finally {
      stopLoading("getAllBandMaterials");
    }
  };

  const getBandMaterialById = async (id: string) => {
    try {
      startLoading("getBandMaterialById");
      setError(null);
      const data = await bandMaterial.getById(id);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch band material");
    } finally {
      stopLoading("getBandMaterialById");
    }
  };

  const createBandMaterial = async (name: string) => {
    try {
      startLoading("createBandMaterial");
      setError(null);
      const data = await bandMaterial.create(name);
      await getAllBandMaterials();
      toast({
        title: "Success",
        description: "Band material created successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create band material";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      stopLoading("createBandMaterial");
    }
  };

  const updateBandMaterial = async (id: string, name: string) => {
    try {
      startLoading("updateBandMaterial");
      setError(null);
      const data = await bandMaterial.update(id, name);
      await getAllBandMaterials();
      toast({
        title: "Success",
        description: "Band material updated successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update band material";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      stopLoading("updateBandMaterial");
    }
  };

  const deleteBandMaterial = async (id: string) => {
    try {
      startLoading("deleteBandMaterial");
      setError(null);
      await bandMaterial.delete(id);
      await getAllBandMaterials();
      toast({
        title: "Success",
        description: "Band material deleted successfully",
        className: "bg-green-500 text-white border-none",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete band material";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      stopLoading("deleteBandMaterial");
    }
  };

  return {
    bandMaterials,
    isLoading,
    error,
    getAllBandMaterials,
    getBandMaterialById,
    createBandMaterial,
    updateBandMaterial,
    deleteBandMaterial,
  };
};
