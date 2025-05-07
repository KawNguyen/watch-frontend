import requestAPI from "@/lib/requestAPI";

export const movement = {
  getAll: () => requestAPI("get", "/movements"),

  getById: (id: string) => requestAPI("get", `/movements/${id}`),

  create: (name: string) => requestAPI("post", "/movements/create", { name }),

  update: (id: string, name: string) =>
    requestAPI("put", `/movements/update/${id}`, { name }),

  delete: (id: string) => requestAPI("delete", `/movements/delete/${id}`),

  search: (query: string) =>
    requestAPI("get", `/movements/search?name=${encodeURIComponent(query)}`),
};
