import makeApiRequest from "@/lib/call-api";

export const movement = {
  getAll: () => makeApiRequest("get", "/movements"),

  getById: (id: string) => makeApiRequest("get", `/movements/${id}`),

  create: (name: string) =>
    makeApiRequest("post", "/movements/create", { name }),

  update: (id: string, name: string) =>
    makeApiRequest("put", `/movements/update/${id}`, { name }),

  delete: (id: string) => makeApiRequest("delete", `/movements/delete/${id}`),

  search: (query: string) =>
    makeApiRequest(
      "get",
      `/movements/search?name=${encodeURIComponent(query)}`,
    ),
};
