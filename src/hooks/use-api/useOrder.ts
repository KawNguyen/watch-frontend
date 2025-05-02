import { useState } from "react";
import { order } from "@/api/order";
import { useToast } from "../use-toast";
import { useLoading } from "../use-loading";
import { useAuth } from "./useAuth";

export const useOrder = () => {
  const { toast } = useToast();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [orders, setOrders] = useState<any>([]);
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { getUser } = useAuth();
  const userId = getUser()?.id;

  const getOrderList = async (page: number, limit: number) => {
    const key = "getOrderList";
    startLoading(key);
    try {
      setError(null);
      const res = await order.getOrderList(userId ,page, limit);
      console.log(res.data)
      setOrders(res.data.items);
      return res.data.items;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch orders";
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

  const getOrderById = async () => {
    const key = "getOrderById";
    startLoading(key);
    try {
      setError(null);
      const response = await order.getOrderById(userId);
      setOrderDetail(response.item);
      return response.item;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch order";
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

  const createOrder = async (addressId: string) => {
    const key = "createOrder";
    startLoading(key);
    try {
      setError(null);
      const response = await order.createOrder(userId, addressId);
      toast({
        variant: "default",
        title: "Success",
        description: "Order created successfully",
        className: "bg-green-500 text-white border-none",
      });
      return response;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create order";
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

  return {
    orders,
    orderDetail,
    isLoading,
    error,
    getOrderList,
    getOrderById,
    createOrder,
  };
};
