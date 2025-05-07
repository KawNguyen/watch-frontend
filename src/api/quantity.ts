import requestAPI from "@/lib/requestAPI";

export const getQuantity = {
  getAll: (page: number, limit: number) =>
    requestAPI("get", `/quantities?page=${page}&limit=${limit}`),

  getById: (id: string) =>
    requestAPI("get", `/quantities/${id}`),

  search: (query: string, page: number, limit: number) =>
    requestAPI(
      "get",
      `/quantities/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
    ),
};
