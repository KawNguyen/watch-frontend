import { get, post, edit, del } from "../utils/requestAPI";
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  images: string[];
}
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export const getProductById = async (
  id: string
): Promise<ApiResponse<Product>> => {
  try {
    const result = await get<Product>(`/products/${id}`);
    return result;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
