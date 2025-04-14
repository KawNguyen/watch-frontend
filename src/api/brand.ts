import axiosInstance from "@/config/axiosInstance";

export const brand = {
  getAll: async () => {
    const response = await axiosInstance.get(`/brands`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get(`/brands/${id}`);
    return response.data;
  },

  create: async (name: string, country: string, logo: string) => {
    const response = await axiosInstance.post(`/brands/create`, {
      name,
      country,
      logo,
    });
    return response.data;
  },

  update: async (id: number, name: string, country: string) => {
    const response = await axiosInstance.put(`/brands/update/${id}`, {
      name,
      country,
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/brands/delete/${id}`);
    return response.data;
  },
};
