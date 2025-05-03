import axiosInstance from "@/config/axiosInstance";

export const favorite = {
  async getUserFavorite(userId: string) {
    const response = await axiosInstance.get(`/favorites?userId=${userId}`);
    return response.data;
  },

  async addToFavorite(userId: string, watchId: string) {
    const response = await axiosInstance.post("/favorites/add", {
      userId,
      watchId,
    });
    return response.data;
  },

  async removeFromFavorite(userId: string, watchId: string) {
    const response = await axiosInstance.delete(
      `/favorites/${userId}/remove/${watchId}`,
      {
        data: {
          userId,
          watchId,
        },
      },
    );
    return response.data;
  },
};
