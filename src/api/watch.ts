import requestAPI from "@/lib/requestAPI";

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

type WatchData = {
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
};

export const watch = {
  getAll: (page: number, pageSize: number) =>
    requestAPI("get", `/watches?page=${page}&limit=${pageSize}`),

  getById: (id: string) =>
    requestAPI("get", `/watches/${id}`),

  create: (watchData: WatchData) =>
    requestAPI("post", "/watches/create", watchData),

  update: (id: string, watchData: WatchData) =>
    requestAPI("put", `/watches/update/${id}`, watchData),

  delete: (id: string) =>
    requestAPI("delete", `/watches/delete/${id}`),

  search: (query: string, page: number, pageSize: number) =>
    requestAPI("get", `/watches/search?name=${encodeURIComponent(query)}&page=${page}&limit=${pageSize}`),

  getByBrand: (brandId: string, page: number, pageSize: number) =>
    requestAPI("get", `/watches/brand/${brandId}?page=${page}&limit=${pageSize}`),

  getByMovement: (movement: string, page: number, pageSize: number) =>
    requestAPI("get", `/watches/movement/${movement}?page=${page}&limit=${pageSize}`),

  getByFilter: (filters: FilterParams) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, String(value));
    });
    return requestAPI("get", `/watches/filter?${queryParams.toString()}`);
  },
};
