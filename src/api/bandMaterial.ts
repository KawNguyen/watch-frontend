import requestAPI from "@/lib/requestAPI";

export const bandMaterial = {
  getAll: () => requestAPI("get", "/band-materials"),

  getById: (id: string) => requestAPI("get", `/band-materials/${id}`),

  create: (name: string) =>
    requestAPI("post", "/band-materials/create", { name }),

  update: (id: string, name: string) =>
    requestAPI("put", `/band-materials/update/${id}`, { name }),

  delete: (id: string) => requestAPI("delete", `/band-materials/delete/${id}`),

  search: (query: string) =>
    requestAPI(
      "get",
      `/band-materials/search?name=${encodeURIComponent(query)}`
    ),
};
