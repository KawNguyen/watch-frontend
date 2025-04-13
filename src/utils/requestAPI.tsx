import axios, { AxiosError, AxiosResponse } from "axios";

const API_DOMAIN = "https://67fbc48f1f8b41c81684ce0b.mockapi.io/api/product/";

// Định nghĩa kiểu dữ liệu phản hồi
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const get = async <T,>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url);
    return { data: response.data, success: true };
  } catch (error) {
    console.error("GET request failed:", error);
    return {
      data: {} as T,
      success: false,
      error: error instanceof AxiosError ? error.message : "Unknown error",
    };
  }
};

export const post = async <T, D>(
  url: string,
  data: D
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data);
    return { data: response.data, success: true };
  } catch (error) {
    console.error("POST request failed:", error);
    return {
      data: {} as T,
      success: false,
      error: error instanceof AxiosError ? error.message : "Unknown error",
    };
  }
};

export const edit = async <T, D>(
  url: string,
  data: D
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.patch(url, data);
    return { data: response.data, success: true };
  } catch (error) {
    console.error("PATCH request failed:", error);
    return {
      data: {} as T,
      success: false,
      error: error instanceof AxiosError ? error.message : "Unknown error",
    };
  }
};

export const del = async <T,>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(url);
    return { data: response.data, success: true };
  } catch (error) {
    console.error("DELETE request failed:", error);
    return {
      data: {} as T,
      success: false,
      error: error instanceof AxiosError ? error.message : "Unknown error",
    };
  }
};
