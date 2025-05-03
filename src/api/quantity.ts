import axiosInstance from "@/config/axiosInstance";

export const getQuantity = {
  getAll: async (page: number, limit: number) => {
    const response = await axiosInstance.get(
      `/quantities?page=${page}&limit=${limit}`,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/quantities/${id}`);
    return response.data;
  },

  search: async (query: string, page: number, limit: number) => {
    const response = await axiosInstance.get(
      `/quantities/search?query=${query}&page=${page}&limit=${limit}`,
    );
    return response.data;
  },
};
