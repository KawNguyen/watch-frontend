import { useState } from "react";
import { material } from "@/api/material";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading"; // Import useLoading

export const useMaterial = () => {
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading(); // Destructure useLoading
  const [error, setError] = useState<string | null>(null);
  const [materials, setMaterials] = useState([]);

  const getAllMaterials = async () => {
    try {
      startLoading("getAllMaterials");
      setError(null);
      const res = await material.getAll();
      setMaterials(res.data.items);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch materials");
    } finally {
      stopLoading("getAllMaterials");
    }
  };

  const getMaterialById = async (id: string) => {
    try {
      startLoading("getMaterialById");
      setError(null);
      const data = await material.getById(id);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch material");
    } finally {
      stopLoading("getMaterialById");
    }
  };

  const createMaterial = async (name: string) => {
    try {
      startLoading("createMaterial");
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
      stopLoading("createMaterial");
    }
  };

  const updateMaterial = async (id: string, name: string) => {
    try {
      startLoading("updateMaterial");
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
      stopLoading("updateMaterial");
    }
  };

  const deleteMaterial = async (id: string) => {
    try {
      startLoading("deleteMaterial");
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
      stopLoading("deleteMaterial");
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
