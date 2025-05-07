import requestAPI from "@/lib/requestAPI";

export const brand = {
  getAll: () => requestAPI("get", "/brands"),

  getById: (id: number) => requestAPI("get", `/brands/${id}`),

  create: (name: string, country: string, logo: string) =>
    requestAPI("post", "/brands/create", { name, country, logo }),

  update: (id: number, name: string, country: string) =>
    requestAPI("put", `/brands/update/${id}`, { name, country }),

  delete: (id: number) => requestAPI("delete", `/brands/delete/${id}`),

  search: (query: string) =>
    requestAPI("get", `/brands/search?name=${encodeURIComponent(query)}`),
};
