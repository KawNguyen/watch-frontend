import requestAPI from "@/lib/requestAPI";

export const favorite = {
  getUserFavorite: (userId: string) =>
    requestAPI("get", `/favorites/${userId}`),

  addToFavorite: (userId: string, watchId: string) =>
    requestAPI("post", "/favorites/add", { userId, watchId }),

  removeFromFavorite: (userId: string, watchId: string) =>
    requestAPI("delete", `/favorites/${userId}/remove/${watchId}`, {
      userId,
      watchId,
    }),
};
