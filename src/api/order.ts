import axiosInstance from "@/config/axiosInstance";

export const order = {
  getOrderList: async (userId: string, page: number, limit: number) => {
    const response = await axiosInstance.get(
      `/orders/${userId}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getOrderById: async (userId: string) => {
    const response = await axiosInstance.get(`/orders/${userId}`);
    return response.data;
  },

  createOrder: async (userId: string, addressId: string) => {
    const response = await axiosInstance.post(`/orders/create`, {
      userId,
      addressId,
    });
    return response.data;
  },
};
