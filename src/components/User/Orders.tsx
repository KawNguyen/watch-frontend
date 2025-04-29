
import { Package } from "lucide-react";
import UserCard from "./UserCard";
import { ScrollArea } from "../ui/scroll-area";
import ProductCard from "./ProductCard";
import { ordersData } from "@/constants/user";

const Orders = () => {
    const orders = ordersData;

    return (
        <UserCard
            title="Orders"
            icon={<Package className="h-4 w-4" />}
            count={orders.length}
        >
            <ScrollArea className="h-[calc(100vh-22rem)]">
                <div className="space-y-6">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            order.products.map((product) => (
                                <ProductCard
                                    key={`${order.id}-${product.id}`}
                                    id={product.id}
                                    title={product.name}
                                    description=""
                                    image={product.image}
                                    price={product.price}
                                    quantity={product.quantity}
                                    type="order"
                                    date={order.date}
                                    status={order.status}
                                    onViewDetails={() => {}}
                                />
                            ))
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">No orders found.</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </UserCard>
    );
};

export default Orders;
