import makeApiRequest from "@/lib/call-api";

export const watch = {
  getAll: (page: number, pageSize: number) =>
    makeApiRequest("get", `/watches?page=${page}&limit=${pageSize}`),

  getById: (id: string) => makeApiRequest("get", `/watches/${id}`),

  create: (watchData: WatchData) =>
    makeApiRequest("post", "/watches/create", watchData),

  update: (id: string, watchData: WatchData) =>
    makeApiRequest("put", `/watches/update/${id}`, watchData),

  delete: (id: string) => makeApiRequest("delete", `/watches/delete/${id}`),

  search: (query: string, page: number, pageSize: number) =>
    makeApiRequest(
      "get",
      `/watches/search?name=${encodeURIComponent(
        query,
      )}&page=${page}&limit=${pageSize}`,
    ),

  getByBrand: (brandId: string, page: number, pageSize: number) =>
    makeApiRequest(
      "get",
      `/watches/brand/${brandId}?page=${page}&limit=${pageSize}`,
    ),

  getByMovement: (movement: string, page: number, pageSize: number) =>
    makeApiRequest(
      "get",
      `/watches/movement/${movement}?page=${page}&limit=${pageSize}`,
    ),

  getByFilter: (filters: FilterParams) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, String(value));
    });
    return makeApiRequest("get", `/watches/filter?${queryParams.toString()}`);
  },
};
