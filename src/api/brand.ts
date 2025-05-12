import makeApiRequest from "@/lib/call-api";

export const brand = {
  getAll: () => makeApiRequest("get", "/brands"),

  getById: (id: number) => makeApiRequest("get", `/brands/${id}`),

  create: (name: string, country: string, logo: string) =>
    makeApiRequest("post", "/brands/create", { name, country, logo }),

  update: (id: number, name: string, country: string) =>
    makeApiRequest("put", `/brands/update/${id}`, { name, country }),

  delete: (id: number) => makeApiRequest("delete", `/brands/delete/${id}`),

  search: (query: string) =>
    makeApiRequest("get", `/brands/search?name=${encodeURIComponent(query)}`),
};
