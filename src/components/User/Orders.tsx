import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mockOrders = [
  {
    id: "ORD001",
    date: "October 15, 2025",
    status: "pending",
    total: 299.98,
    products: [
      {
        id: "PROD1",
        name: "Premium Wireless Headphones",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD002",
    date: "October 14, 2025",
    status: "processing",
    total: 449.97,
    products: [
      {
        id: "PROD2",
        name: "Wireless Earbuds Pro",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        quantity: 3,
      },
    ],
  },
  {
    id: "ORD003",
    date: "October 13, 2025",
    status: "shipped",
    total: 199.99,
    products: [
      {
        id: "PROD3",
        name: "Premium Speaker System",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        quantity: 1,
      },
    ],
  },
] as const;

const Orders = () => {
  const orders = mockOrders;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Orders</h2>

      {/* Orders List */}
      {orders.length > 0 ? (
        orders.map((order) => (
          <Card key={order.id} className="mb-4">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                <span>Order #{order.id}</span>
                <span className="text-sm font-normal text-muted-foreground md:text-base">
                  {order.date}
                </span>
              </CardTitle>
              <div className="text-sm text-muted-foreground hidden md:block">
                {order.date}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col md:flex-row items-center gap-4 border rounded-lg p-3 md:p-5 bg-white shadow-sm"
                  >
                    <div className="h-36 w-36 sm:h-32 sm:w-32 md:h-40 md:w-40 flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>

                    {/* Chi tiết sản phẩm */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2 w-full">
                      {/* Tên sản phẩm */}
                      <div className="w-full sm:w-1/2 text-center sm:text-left">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
                          {product.name}
                        </h4>
                      </div>

                      <div className="flex flex-row justify-center sm:justify-end items-center gap-4 w-full sm:w-1/2">
                        {/* Quantity */}
                        <div className="text-center sm:text-right">
                          <div className="text-xs sm:text-sm text-gray-500">
                            Quantity
                          </div>
                          <div className="font-medium">{product.quantity}</div>
                        </div>
                        {/* Price */}
                        <div className="text-center sm:text-right">
                          <div className="text-xs sm:text-sm text-gray-500">
                            Price
                          </div>
                          <div className="font-medium">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator className="my-2" />
                <div className="flex justify-between items-center px-2">
                  <span className="font-semibold text-base sm:text-lg">
                    Total:
                  </span>
                  <span className="font-semibold text-base sm:text-lg text-blue-600">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
