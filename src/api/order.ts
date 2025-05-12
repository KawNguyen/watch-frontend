import makeApiRequest from "@/lib/call-api";

export const order = {
  getOrdersByUserId: (userId: string) =>
    makeApiRequest("get", `/orders/${userId}`),

  getAllOrders: () => makeApiRequest("get", `/orders`),

  getOrder: (orderId: string) =>
    makeApiRequest("get", `/orders/detail/${orderId}`),

  createOrder: (userId: string, addressId: string) =>
    makeApiRequest("post", `/orders/create`, { userId, addressId }),

  updateStatus: (orderId: string, status: string) =>
    makeApiRequest("put", `/orders/status/${orderId}`, { orderId, status }),
};
