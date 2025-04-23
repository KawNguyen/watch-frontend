import axiosInstance from "@/config/axiosInstance";

export const material = {
  getAll: async () => {
    const response = await axiosInstance.get(`/materials`);
    return response?.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/materials/${id}`);
    return response.data;
  },

  create: async (name: string) => {
    const response = await axiosInstance.post(`/materials/create`, {
      name,
    });
    return response.data;
  },

  update: async (id: string, name: string) => {
    const response = await axiosInstance.put(`/materials/update/${id}`, {
      name,
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/materials/delete/${id}`);
    return response.data;
  },

  search: async (query: string) => {
    const response = await axiosInstance.get(`/materials/search?name=${query}`);
    return response.data;
  },
};
