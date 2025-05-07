import { useState } from "react";
import { user } from "@/api/user";
import { useToast } from "../use-toast";
import { useAuth } from "./useAuth";
import { useLoading } from "../use-loading"; // Import useLoading

export const useUser = () => {
  const { getUser } = useAuth();
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading(); // Destructure useLoading
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const userId = getUser()?.id;

  const getAllUsers = async () => {
    const key = "getAllUsers";
    startLoading(key);
    try {
      setError(null);
      const res = await user.getAll();
      setUsers(res.data.items);
      return res;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch users";
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

  const getUserById = async () => {
    const key = "getUserById";
    startLoading(key);
    try {
      setError(null);
      const res = await user.getById(userId);
      setUserData(res.data.item);
      return res.data.item;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch user";
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

  const searchUsers = async (searchTerm: string) => {
    const key = "searchUsers";
    startLoading(key);
    try {
      setError(null);
      const res = await user.searchUsers(searchTerm);
      return res.data.items;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to search users";
      setError(errorMessage);
    } finally {
      stopLoading(key);
    }
  };

  const updateUser = async (updatedUserData: any) => {
    const key = "updateUser";
    startLoading(key);
    try {
      setError(null);
      const res = await user.updateUser(userId, updatedUserData);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast({
        variant: "default",
        title: "Success",
        description: "User updated successfully",
        className: "bg-green-500 text-white border-none",
      });
      setUserData(res.user);
      return res.data.item;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update user";
      setError(errorMessage);
    } finally {
      stopLoading(key);
    }
  };


  return {
    users,
    error,
    userData,
    isLoading,
    updateUser,
    searchUsers,
    getAllUsers,
    getUserById,
  };
};
