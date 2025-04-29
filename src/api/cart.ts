import axiosInstance from "@/config/axiosInstance";

export const cart = {
  getUserCart: async (userId: string) => {
    const response = await axiosInstance.get(`/cart/${userId}`);
    return response.data;
  },

  addToCart: async (userId: string, watchId: string, quantity: number) => {
    const response = await axiosInstance.post("/cart/add", {
      userId,
      watchId,
      quantity,
    });
    return response.data;
  },

  removeItemFromCart: async (userId: string, cartItemId: string) => {
    const response = await axiosInstance.delete(
      `/cart/${userId}/remove/${cartItemId}`,
      {
        data: {
          userId,
          cartItemId,
        },
      }
    );
    return response.data;
  },

  clearCart: async () => {
    const response = await axiosInstance.delete("/cart/clear");
    return response.data;
  },

  updateQuantity: async (
    userId: string,
    cartItemId: string,
    quantity: number
  ) => {
    const response = await axiosInstance.put(
      `/cart/${userId}/update-quantity/${cartItemId}`,
      {
        userId,
        cartItemId,
        quantity,
      }
    );
    return response.data;
  },
};
