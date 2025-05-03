import axiosInstance from "@/config/axiosInstance";

export const movement = {
  getAll: async () => {
    const response = await axiosInstance.get(`/movements`);
    return response?.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/movements/${id}`);
    return response.data;
  },

  create: async (name: string) => {
    const response = await axiosInstance.post(`/movements/create`, {
      name,
    });
    return response.data;
  },

  update: async (id: string, name: string) => {
    const response = await axiosInstance.put(`/movements/update/${id}`, {
      name,
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/movements/delete/${id}`);
    return response.data;
  },

  search: async (query: string) => {
    const response = await axiosInstance.get(`/movements/search?name=${query}`);
    return response.data;
  },
};
