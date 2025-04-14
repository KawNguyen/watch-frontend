import axiosInstance from "@/config/axiosInstance";

export const bandMaterial = {
  getAll: async () => {
    const response = await axiosInstance.get(`/band-materials`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/band-materials/${id}`);
    return response.data;
  },

  create: async (name: string) => {
    const response = await axiosInstance.post(`/band-materials/create`, {
      name,
    });
    return response.data;
  },

  update: async (id: string, name: string) => {
    const response = await axiosInstance.put(`/band-materials/update/${id}`, {
      name,
    });  
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/band-materials/delete/${id}`);
    return response.data;
  },
}