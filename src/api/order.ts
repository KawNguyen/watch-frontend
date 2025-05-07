import requestAPI from "@/lib/requestAPI";

export const order = {
  getOrdersByUserId: (userId: string) =>
    requestAPI("get", `/orders/${userId}`),

  getOrderById: (userId: string) =>
    requestAPI("get", `/orders/${userId}`),

  createOrder: (userId: string, addressId: string) =>
    requestAPI("post", `/orders/create`, { userId, addressId }),
};
