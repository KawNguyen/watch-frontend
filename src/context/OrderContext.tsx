import { createContext, useContext, useEffect, useState } from "react";
import { order } from "@/api/order";
import { toast } from "sonner";
import { useMutation } from "@/hooks/use-mutation";
import { useCartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { useOrderByUser } from "@/hooks/use-api-query/useOrder";

interface OrderContextProps {
  data: any;
  isLoading: boolean;
  orderCount: number;
  refetchOrder: () => void;
  createOrder: (addressId: string) => void;
  isLoadingCreatingOrder: boolean;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useUserContext();
  const navigate = useNavigate();
  const { refetchCart } = useCartContext();
  const { data: orderData, isLoading, refetch } = useOrderByUser(userId);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (orderData?.data?.items) {
      setOrderCount(orderData?.data?.items.length);
    } else {
      setOrderCount(0);
    }
  }, [orderData]);

  const mutateCreateOrder = useMutation({
    mutationFn: (addressId: string) => order.createOrder(userId, addressId),
    onSuccess: () => {
      toast.success("Order successfully");
      refetch();
      navigate("/payment-success");
      refetchCart();
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const createOrder = (addressId: string) => {
    mutateCreateOrder.mutate(addressId);
  };

  return (
    <OrderContext.Provider
      value={{
        data: orderData,
        isLoading: isLoading,
        orderCount,
        createOrder,
        isLoadingCreatingOrder: mutateCreateOrder.isLoading,
        refetchOrder: refetch,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }
  return context;
};
