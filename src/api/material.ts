import requestAPI from "@/lib/requestAPI";

export const material = {
  getAll: () => requestAPI("get", "/materials"),

  getById: (id: string) => requestAPI("get", `/materials/${id}`),

  create: (name: string) => requestAPI("post", "/materials/create", { name }),

  update: (id: string, name: string) =>
    requestAPI("put", `/materials/update/${id}`, { name }),

  delete: (id: string) => requestAPI("delete", `/materials/delete/${id}`),

  search: (query: string) =>
    requestAPI("get", `/materials/search?name=${encodeURIComponent(query)}`),
};