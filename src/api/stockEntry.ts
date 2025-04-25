import axiosInstance from "@/config/axiosInstance";

export const stockEntry = {
  getAll: async () => {
    const response = await axiosInstance.get(`/stock-entries`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/stock-entries/${id}`);
    return response.data;
  },

  create: async (stockEntryData: {
    quantity: number;
    productId: string;
    warehouseId: string;
  }) => {
    const response = await axiosInstance.post(
      `/stock-entries/create`,
      stockEntryData
    );
    return response.data;
  },

  
};
