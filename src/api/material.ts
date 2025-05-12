import makeApiRequest from "@/lib/call-api";

export const material = {
  getAll: () => makeApiRequest("get", "/materials"),

  getById: (id: string) => makeApiRequest("get", `/materials/${id}`),

  create: (name: string) =>
    makeApiRequest("post", "/materials/create", { name }),

  update: (id: string, name: string) =>
    makeApiRequest("put", `/materials/update/${id}`, { name }),

  delete: (id: string) => makeApiRequest("delete", `/materials/delete/${id}`),

  search: (query: string) =>
    makeApiRequest(
      "get",
      `/materials/search?name=${encodeURIComponent(query)}`,
    ),
};
