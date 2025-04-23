import axiosInstance from "@/config/axiosInstance";

export const watch = {
  getAll: async () => {
    const response = await axiosInstance.get(`/watches`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/watches/${id}`);
    return response.data;
  },

  create: async (watchData: {
    name: string;
    description: string;
    price: number;
    gender: "MEN" | "WOMEN" | "UNISEX";
    brandId: string;
    materialId: string;
    bandMaterialId: string;
    movementId: string;
    diameter: number;
    waterResistance: number;
    warranty: number;
    videoUrl: string;
    images: { url: string }[];
  }) => {
    const response = await axiosInstance.post(`/watches/create`, watchData);
    return response.data;
  },

  update: async (
    id: string,
    watchData: {
      name: string;
      description: string;
      price: number;
      gender: "MEN" | "WOMEN" | "UNISEX";
      brandId: string;
      materialId: string;
      bandMaterialId: string;
      movementId: string;
      diameter: number;
      waterResistance: number;
      warranty: number;
      videoUrl: string;
      images: { url: string }[];
    }
  ) => {
    const response = await axiosInstance.put(
      `/watches/update/${id}`,
      watchData
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/watches/delete/${id}`);
    return response.data;
  },

  search: async (query: string) => {
    const response = await axiosInstance.get(`/watches/search?name=${query}`);
    return response.data;
  },

  getByBrand: async (brandId: string) => {
    const response = await axiosInstance.get(
      `/watches/brand/${brandId}`
    );
    return response.data;
  },
};
