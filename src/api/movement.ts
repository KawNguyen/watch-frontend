import axiosInstance from "@/config/axiosInstance";

export const movement = {
  getAll: async () => {
    const response = await axiosInstance.get(`/movements`);
    return response.data.items;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/movements/${id}`);
    return response.data.items;
  },

  create: async (name: string ) => {
    const response = await axiosInstance.post(`/movements/create`, {
      name
    });
    return response.data.items;
  },

  update: async (id: string, name: string)=>{
    const response = await axiosInstance.put(`/movements/update/${id}`, {
      name
    });
    return response.data.items;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/movements/delete/${id}`);
    return response.data.items;
  },
  
};
