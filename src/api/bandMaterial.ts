import makeApiRequest from "@/lib/call-api";

export const bandMaterial = {
  getAll: () => makeApiRequest("get", "/band-materials"),

  getById: (id: string) => makeApiRequest("get", `/band-materials/${id}`),

  create: (name: string) =>
    makeApiRequest("post", "/band-materials/create", { name }),

  update: (id: string, name: string) =>
    makeApiRequest("put", `/band-materials/update/${id}`, { name }),

  delete: (id: string) =>
    makeApiRequest("delete", `/band-materials/delete/${id}`),

  search: (query: string) =>
    makeApiRequest(
      "get",
      `/band-materials/search?name=${encodeURIComponent(query)}`,
    ),
};
