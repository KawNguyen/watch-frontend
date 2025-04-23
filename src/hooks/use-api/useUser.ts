import { useState } from "react";
import { user } from "@/api/user";
import { useToast } from "../use-toast";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const {getUser} = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = getUser()?.id;

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await user.getAll();
      setUsers(res.data.items);
      return res;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch users";
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

  const getUserById = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await user.getById(userId);
      return res.data.item;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch user";
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

  const searchUsers = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await user.searchUsers(searchTerm);
      return data; 
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to search users";
      setError(errorMessage); 
    }
  }

  const updateUser = async ( updatedUserData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await user.updateUser(userId, updatedUserData); 
      toast({
        variant: "default",
        title: "Success",
        description: "User updated successfully",
        className: "bg-green-500 text-white border-none",
      });
      getUserById();
      return res;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update user";
      setError(errorMessage); 
    }finally {
      setIsLoading(false);
    }
  }

  return {
    users,
    isLoading,
    error,
    updateUser,
    searchUsers,
    getAllUsers,
    getUserById,
  };
};