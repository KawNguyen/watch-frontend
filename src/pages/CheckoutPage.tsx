import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "@/components/ui/image";
import { useUserData } from "@/hooks/use-api-query/useUser";
import { useAuth } from "@/hooks/use-api/useAuth";
import { useCartContext } from "@/context/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrderContext } from "@/context/OrderContext";

type AddressType = {
  id: string;
  street: string;
  district: string;
  ward: string;
  city: string;
  country: string;
};

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  addresses: AddressType[];
};

const CheckoutPage = () => {
  const { getUser } = useAuth();
  const currentUser = getUser();
  const userId = currentUser?.id;
  const { data: cartData, isLoading: loadingCart } = useCartContext();
  const { createOrder, isLoadingCreatingOrder } = useOrderContext();
  const items = cartData?.data?.items;

  const { data: resData } = useUserData(userId);
  const userData = resData?.data?.item;
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    addresses: [
      {
        id: "",
        street: "",
        district: "",
        ward: "",
        city: "",
        country: "",
      },
    ],
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        addresses: userData.addresses || [
          {
            id: "",
            street: "",
            district: "",
            ward: "",
            city: "",
            country: "",
          },
        ],
      });
    }
  }, [userData]);

  const subtotal =
    items?.reduce(
      (sum: any, item: any) => sum + item.watch.price * item.quantity,
      0
    ) || 0;
  const shipping = 10.0;
  const total = subtotal + shipping;

  const onSubmit = async () => {
    try {
      if (!userData.addresses[0]?.id) {
        throw new Error("Please select a shipping address");
      }
      createOrder(userData.addresses[0]?.id);
    } catch (error: any) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Order Items</h2>
              <div className="space-y-4">
                {loadingCart ? (
                  <>
                    {[1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-4 border-b last:border-0"
                      >
                        <Skeleton className="w-24 h-24 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                          <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {items?.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex gap-4 py-4 border-b last:border-0"
                      >
                        <div className="w-24 h-24">
                          <Image
                            src={item.watch.images[0].url}
                            alt={item.watch.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">{item.watch.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.watch.brand.name}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">
                              Quantity: {item.quantity}
                            </span>
                            <span className="font-medium">
                              {formatPrice(item.watch.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Shipping Information
              </h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input value={formData.name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" value={formData.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input type="tel" value={formData.phone} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street</Label>
                    <Input value={formData.addresses[0]?.street} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input value={formData.addresses[0]?.district} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward">Ward</Label>
                    <Input value={formData.addresses[0]?.ward} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input value={formData.addresses[0]?.city} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input value={formData.addresses[0]?.country} disabled />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-80">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  size="lg"
                  onClick={onSubmit}
                  disabled={isLoadingCreatingOrder}
                >
                  {isLoadingCreatingOrder ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
