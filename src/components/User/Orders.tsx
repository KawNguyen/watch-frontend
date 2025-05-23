import { Package } from "lucide-react";
import UserCard from "./UserCard";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDateTime } from "@/lib/utils";
import Image from "@/components/ui/image";
import { useOrderContext } from "@/context/OrderContext";

const Orders = () => {
  const { data: ordersUser, isLoading } = useOrderContext();
  const ordersList = ordersUser?.data?.items || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "PROCESSING":
        return "bg-blue-500";
      case "SHIPPED":
        return "bg-purple-500";
      case "DELIVERED":
        return "bg-green-500";
      case "CANCELED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <UserCard
      title="Order History"
      icon={<Package className="h-4 w-4" />}
      count={ordersList.length}
    >
      <ScrollArea className="h-[calc(100vh-22rem)]">
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : ordersList.length > 0 ? (
            ordersList.map((order: any) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20">
                          <Image
                            src={item.watch.images[0].url}
                            alt={item.watch.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.watch.name}</h4>
                          <p className="text-sm text-gray-500">
                            {item.watch.brand.name}
                          </p>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-medium">
                              {formatPrice(item.watch.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Total Amount</p>
                      <p className="font-semibold">
                        {formatPrice(order.totalPrice)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Delivered to: {order.address.street}, {order.address.ward}
                      , {order.address.district}, {order.address.city}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                When you make a purchase, your orders will appear here
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </UserCard>
  );
};

export default Orders;
