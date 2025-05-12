import makeApiRequest from "@/lib/call-api";

export const cart = {
  getUserCart: (userId: string) => makeApiRequest("get", `/cart/${userId}`),

  addToCart: (userId: string, watchId: string, quantity: number) =>
    makeApiRequest("post", "/cart/add", { userId, watchId, quantity }),

  removeItemFromCart: (userId: string, cartItemId: string) =>
    makeApiRequest("delete", `/cart/${userId}/remove/${cartItemId}`, {
      userId,
      cartItemId,
    }),

  clearCart: () => makeApiRequest("delete", "/cart/clear"),

  updateQuantity: (userId: string, cartItemId: string, quantity: number) =>
    makeApiRequest("put", `/cart/${userId}/update-quantity/${cartItemId}`, {
      userId,
      cartItemId,
      quantity,
    }),
};
