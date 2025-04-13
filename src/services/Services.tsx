import { get, post, edit, del } from "../utils/requestAPI";
// Existing Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  images: string[];
}

// Childrend Category interfaces
export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  childrend: SubCategory[]; // Note: API uses "childrend" (typo but we'll match it)
}

// API Response interface
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
export const getAllProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const result = await get<Product[]>("/products");
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      data: [],
      success: false,
      error: "Không thể lấy được dữ liệu từ api products",
    };
  }
};
// New Category services
export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const result = await get<Category[]>("/category");
    return result;
  } catch (error) {
    console.error("Không thể lấy được dữ liệu từ apig categories:", error);
    return {
      data: [],
      success: false,
      error: "Không thể lấy được dữ liệu từ api categories",
    };
  }
};
