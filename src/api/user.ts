import axiosInstance from "@/config/axiosInstance";

export const user = {
  getAll: async () => {
    const response = await axiosInstance.get(`/users`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  searchUsers: async (searchTerm: string) => {
    const response = await axiosInstance.get(
      `/users/search?query=${searchTerm}`,
    );
    return response.data;
  },

  updateUser: async (id: string, data: any) => {
    const response = await axiosInstance.put(`/users/update/${id}`, data);
    return response.data;
  },
};
