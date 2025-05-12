import axiosInstance from "@/config/axiosInstance";

const makeApiRequest = async <T = any>(method: string, url: string, data?: any) => {
  const response = await axiosInstance({ method, url, data });
  return response.data as T;
};

export default makeApiRequest;
