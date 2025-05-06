import axiosInstance from "@/config/axiosInstance";

export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const response = await axiosInstance.post(`/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  verifyOTP: async (userId: string, otp: string) => {
    const response = await axiosInstance.post(`/auth/verify-otp`, {
      userId,
      otp,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post(`/auth/logout`);
    return response.data;
  },
};
