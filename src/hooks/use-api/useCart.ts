import { useState } from "react";
import { cart } from "@/api/cart";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading";
import { useAuth } from "./useAuth";
import { useGlobalStore } from "@/store/useGlobalStore";

export const useCart = () => {
  const { getUser } = useAuth();
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const userId = getUser()?.id;
  
  const updateCartCount = useGlobalStore((state) => state.updateCartCount);

  const showErrorToast = (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
      className: "bg-red-500 text-white border-none",
    });
  };

  const getUserCart = async () => {
    const key = "getCart";
    startLoading(key);
    try {
      setError(null);
      if (!userId) throw new Error("User not authenticated");
      const res = await cart.getUserCart(userId);
      await updateCartCount(userId);
      setItems(res.data.item.items);
      return res.data.item.items;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch cart";
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      stopLoading(key);
    }
  };

  const addToCart = async (watchId: string, quantity: number) => {
    const key = "addToCart";
    startLoading(key);
    try {
      setError(null);
      if (!userId) throw new Error("User not authenticated");
      const res = await cart.addToCart(userId, watchId, quantity);
      setItems(res.data.items);
      await updateCartCount(userId);
      toast({
        title: "Success",
        description: "Item added to cart successfully",
        className: "bg-green-500 text-white border-none",
      });
      return res.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to add item to cart";
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      stopLoading(key);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    const key = "removeFromCart";
    startLoading(key);
    try {
      setError(null);
      if (!userId) throw new Error("User not authenticated");
      const res = await cart.removeItemFromCart(userId, cartItemId);
      await updateCartCount(userId);
      toast({
        title: "Success",
        description: "Item removed from cart successfully",
        className: "bg-green-500 text-white border-none",
      });
      return res.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to remove item from cart";
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      stopLoading(key);
    }
  };

  const clearCart = async () => {
    const key = "clearCart";
    startLoading(key);
    try {
      setError(null);
      if (!userId) throw new Error("User not authenticated");
      const res = await cart.clearCart();
      setItems([]);
      await updateCartCount(userId);
      toast({
        title: "Success",
        description: "Cart cleared successfully",
        className: "bg-green-500 text-white border-none",
      });
      return res.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to clear cart";
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      stopLoading(key);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    const key = "updateQuantity";
    startLoading(key);
    try {
      setError(null);
      if (!userId) throw new Error("User not authenticated");
      const res = await cart.updateQuantity(userId, cartItemId, quantity);
      setItems(res.data.items);
      await updateCartCount(userId);
      toast({
        title: "Success",
        description: "Quantity updated successfully",
        className: "bg-green-500 text-white border-none",
      });
      return res.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update quantity";
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      stopLoading(key);
    }
  };

  return {
    items,
    error,
    isLoading,
    getUserCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };
};
