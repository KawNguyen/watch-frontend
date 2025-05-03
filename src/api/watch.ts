import axiosInstance from "@/config/axiosInstance";

type FilterParams = {
  brand?: string;
  bandMaterial?: string;
  movement?: string;
  material?: string;
  gender?: string;
  diameter?: number;
  waterResistance?: number;
  warranty?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

export const watch = {
  getAll: async (page: number, pageSize: number) => {
    const response = await axiosInstance.get(
      `/watches?page=${page}&limit=${pageSize}`,
    );
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
    },
  ) => {
    const response = await axiosInstance.put(
      `/watches/update/${id}`,
      watchData,
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/watches/delete/${id}`);
    return response.data;
  },

  search: async (query: string, page: number, pageSize: number) => {
    const response = await axiosInstance.get(
      `/watches/search?name=${query}&page=${page}&limit=${pageSize}`,
    );
    return response.data;
  },

  getByBrand: async (brandId: string, page: number, pageSize: number) => {
    const response = await axiosInstance.get(
      `/watches/brand/${brandId}?page=${page}&limit=${pageSize}`,
    );
    return response.data;
  },

  getByMovement: async (movement: string, page: number, pageSize: number) => {
    const response = await axiosInstance.get(
      `/watches/movement/${movement}?page=${page}&limit=${pageSize}`,
    );
    return response.data;
  },

  getByFilter: async (filters: FilterParams) => {
    const queryParams = new URLSearchParams();

    if (filters.brand) queryParams.append("brand", filters.brand);
    if (filters.bandMaterial)
      queryParams.append("bandMaterial", filters.bandMaterial);
    if (filters.movement) queryParams.append("movement", filters.movement);
    if (filters.material) queryParams.append("material", filters.material);
    if (filters.gender) queryParams.append("gender", filters.gender);
    if (filters.diameter)
      queryParams.append("diameter", filters.diameter.toString());
    if (filters.waterResistance)
      queryParams.append("waterResistance", filters.waterResistance.toString());
    if (filters.warranty)
      queryParams.append("warranty", filters.warranty.toString());
    if (filters.minPrice)
      queryParams.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice)
      queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters.page) queryParams.append("page", filters.page.toString());
    if (filters.limit) queryParams.append("limit", filters.limit.toString());

    const response = await axiosInstance.get(
      `/watches/filter?${queryParams.toString()}`,
    );
    return response.data;
  },
};
