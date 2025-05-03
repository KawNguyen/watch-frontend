import { useState } from "react";
import { movement } from "@/api/movement";
import { useToast } from "../use-toast";

export const useMovement = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movements, setMovements] = useState([]);

  const getAllMovements = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await movement.getAll();
      setMovements(res.data.items);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch movements");
    } finally {
      setIsLoading(false);
    }
  };

  const getMovementById = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await movement.getById(id);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch movement");
    } finally {
      setIsLoading(false);
    }
  };

  const createMovement = async (name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await movement.create(name);
      await getAllMovements();
      toast({
        title: "Success",
        description: "Movement created successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create movement";
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

  const updateMovement = async (id: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await movement.update(id, name);
      await getAllMovements();
      toast({
        title: "Success",
        description: "Movement updated successfully",
        className: "bg-green-500 text-white border-none",
      });
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update movement";
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

  const deleteMovement = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await movement.delete(id);
      await getAllMovements();
      toast({
        title: "Success",
        description: "Movement deleted successfully",
        className: "bg-green-500 text-white border-none",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete movement";
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
    movements,
    isLoading,
    error,
    getAllMovements,
    getMovementById,
    createMovement,
    updateMovement,
    deleteMovement,
  };
};
