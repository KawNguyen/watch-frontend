import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import UserCard from "./UserCard";
import ProductCard from "./ProductCard";
import { useCart } from "@/hooks/use-api/useCart";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { items, getUserCart, removeFromCart, isLoading, updateQuantity } =
    useCart();


  useEffect(() => {
    getUserCart();
  }, []);

  const handleQuantityChange = async (id: string, quantity: number) => {
    try {
      await updateQuantity(id, quantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemove = async (id: string) => {
    await removeFromCart(id);
    getUserCart();
  };

  const subtotal =
    items?.reduce((sum, item) => sum + item.watch.price * item.quantity, 0) ||
    0;
  const shipping = 10.0;
  const total = subtotal + shipping;

  return (
    <UserCard
      title="Shopping Cart"
      icon={<ShoppingCart className="h-4 w-4" />}
      count={items?.length || 0}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <ScrollArea className="h-[calc(100vh-22rem)] pr-4">
            <div className="flex flex-col gap-4">
              {isLoading("getCart") ? (
                <>
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex gap-4">
                      <Skeleton className="h-24 w-24 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                items.map((item: any) => (
                  <ProductCard
                    key={item.id}
                    {...item.watch}
                    cartItemId={item.id}
                    quantity={item.quantity}
                    type="cart"
                    onQuantityChange={handleQuantityChange}
                    onRemove={() => handleRemove(item.id)} 
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <Card className="w-full lg:w-80 h-fit">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">{formatPrice(shipping)}</span>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{formatPrice(total)}</span>
              </div>
            </div>

            <Button 
              className="w-full mt-6"
              onClick={() => navigate("/checkout")}
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </UserCard>
  );
};

export default Cart;
