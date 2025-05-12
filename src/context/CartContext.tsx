import { createContext, useContext, useEffect, useState } from "react";
import { useUserCart } from "@/hooks/use-api-query/useCart";
import { useMutation } from "@/hooks/use-mutation";
import { cart } from "@/api/cart";
import { toast } from "sonner";
import { useUserContext } from "./UserContext";

interface CartContextProps {
  data: any;
  isLoading: boolean;
  cartCount: number;
  refetchCart: () => void;
  addToCart: (watchId: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (variables: { cartItemId: string; quantity: number }) => void;
  isLoadingAddingToCart: boolean;
  isLoadingRemovingFromCart: boolean;
  isLoadingUpdatingQuantity: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useUserContext();
  const { data: cartData, isLoading, refetch } = useUserCart(userId);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (cartData?.data?.items) {
      setCartCount(cartData.data.items.length);
    } else {
      setCartCount(0);
    }
  }, [cartData]);

  const mutateAddToCart = useMutation({
    mutationFn: (variables: { watchId: string; quantity: number }) =>
      cart.addToCart(userId, variables.watchId, variables.quantity),
    onSuccess: () => {
      toast.success("Product added to cart successfully");
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const addToCart = (watchId: string, quantity: number = 1) => {
    mutateAddToCart.mutate({ watchId, quantity });
  };

  const mutateRemoveFromCart = useMutation({
    mutationFn: (cartItemId: string) =>
      cart.removeItemFromCart(userId, cartItemId),
    onSuccess: () => {
      toast.success("Remove product successfully");
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const removeFromCart = (cartItemId: string) => {
    mutateRemoveFromCart.mutate(cartItemId);
  };

  const mutateUpdateQuantity = useMutation({
    mutationFn: (variables: { cartItemId: string; quantity: number }) =>
      cart.updateQuantity(userId, variables.cartItemId, variables.quantity),
    onSuccess: () => {
      toast.success("Update profile successfully");
      refetch();
    },
  });

  const updateQuantity = (variables: {
    cartItemId: string;
    quantity: number;
  }) => {
    mutateUpdateQuantity.mutate(variables);
  };

  return (
    <CartContext.Provider
      value={{
        data: cartData,
        isLoading,
        cartCount,
        refetchCart: refetch,
        addToCart,
        removeFromCart,
        updateQuantity,
        isLoadingAddingToCart: mutateAddToCart.isLoading,
        isLoadingRemovingFromCart: mutateRemoveFromCart.isLoading,
        isLoadingUpdatingQuantity: mutateUpdateQuantity.isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
