import requestAPI from "@/lib/requestAPI";

export const cart = {
  getUserCart: (userId: string) => requestAPI("get", `/cart/${userId}`),

  addToCart: (userId: string, watchId: string, quantity: number) =>
    requestAPI("post", "/cart/add", { userId, watchId, quantity }),

  removeItemFromCart: (userId: string, cartItemId: string) =>
    requestAPI("delete", `/cart/${userId}/remove/${cartItemId}`, {
      userId,
      cartItemId,
    }),

  clearCart: () => requestAPI("delete", "/cart/clear"),

  updateQuantity: (userId: string, cartItemId: string, quantity: number) =>
    requestAPI("put", `/cart/${userId}/update-quantity/${cartItemId}`, {
      userId,
      cartItemId,
      quantity,
    }),
};
