import makeApiRequest from "@/lib/call-api";

export const favorite = {
  getUserFavorite: (userId: string) =>
    makeApiRequest("get", `/favorites/${userId}`),

  addToFavorite: (userId: string, watchId: string) =>
    makeApiRequest("post", "/favorites/add", { userId, watchId }),

  removeFromFavorite: (userId: string, watchId: string) =>
    makeApiRequest("delete", `/favorites/${userId}/remove/${watchId}`, {
      userId,
      watchId,
    }),
};
