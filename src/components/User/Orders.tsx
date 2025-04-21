import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mockOrders = [
  {
    id: "ORD001",
    date: "October 15, 2025",
    status: "pending",
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
                    className="flex flex-col md:flex-row items-center justify-between gap-6 border rounded-lg p-4 md:p-5 bg-white shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full">
                      {/* Ảnh sản phẩm */}
                      <div className="w-full md:w-full md:h-full overflow-hidden rounded-md shadow-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>

                      {/* Tên sản phẩm */}
                      <div className="w-full text-center md:text-left">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                          {product.name}
                        </h4>
                      </div>
                    </div>

                    {/* Thông tin giá và số lượng - căn giữa */}
                    <div className="flex gap-8 items-center">
                      {/* Quantity */}
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Quantity</div>
                        <div className="font-medium">{product.quantity}</div>
                      </div>

                      {/* Price */}
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Price</div>
                        <div className="font-medium">
                          ${product.price.toFixed(2)}
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
                    ${" "}
                    {order.products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )}
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
