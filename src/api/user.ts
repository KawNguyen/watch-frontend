import makeApiRequest from "@/lib/call-api";

export const user = {
  getAll: () => makeApiRequest("get", "/users"),

  getById: (id: string) => makeApiRequest("get", `/users/${id}`),

  searchUsers: (searchTerm: string) =>
    makeApiRequest(
      "get",
      `/users/search?query=${encodeURIComponent(searchTerm)}`,
    ),

  updateUser: (id: string, data: any) =>
    makeApiRequest("put", `/users/update/${id}`, data),
};
