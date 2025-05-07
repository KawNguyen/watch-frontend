import requestAPI from "@/lib/requestAPI";

export const user = {
  getAll: () => requestAPI("get", "/users"),

  getById: (id: string) => requestAPI("get", `/users/${id}`),

  searchUsers: (searchTerm: string) =>
    requestAPI("get", `/users/search?query=${encodeURIComponent(searchTerm)}`),

  updateUser: (id: string, data: any) =>
    requestAPI("put", `/users/update/${id}`, data),
};
