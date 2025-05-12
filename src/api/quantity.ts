import makeApiRequest from "@/lib/call-api";

export const getQuantity = {
  getAll: (page: number, limit: number) =>
    makeApiRequest("get", `/quantities?page=${page}&limit=${limit}`),

  getById: (id: string) => makeApiRequest("get", `/quantities/${id}`),

  search: (query: string, page: number, limit: number) =>
    makeApiRequest(
      "get",
      `/quantities/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
    ),
};
