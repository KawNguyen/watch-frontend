import { useState } from "react";
import { material } from "@/api/material";
import { useToast } from "./use-toast";

export const useMaterial = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [materials, setMaterials] = useState([]);

  const getAllMaterials = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await material.getAll();
      setMaterials(data);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch materials");
    } finally {
      setIsLoading(false);
    }
  };

  const getMaterialById = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await material.getById(id);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch material");
    } finally {
      setIsLoading(false);
    }
  };

  const createMaterial = async (name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await material.create(name);
      await getAllMaterials();
      toast({
        title: "Success",
        description: "Material created successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create material";
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

  const updateMaterial = async (id: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await material.update(id, name);
      await getAllMaterials();
      toast({
        title: "Success",
        description: "Material updated successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update material";
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

  const deleteMaterial = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await material.delete(id);
      await getAllMaterials();
      toast({
        title: "Success",
        description: "Material deleted successfully",
        className: "bg-green-500 text-white border-none",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete material";
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
    materials,
    isLoading,
    error,
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  };
};
