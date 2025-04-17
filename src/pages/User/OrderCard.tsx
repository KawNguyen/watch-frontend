import React from "react";
import { ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderCardProps {
  order: {
    id: string;
    date: string;
    total: number;
    products: Product[];
  };
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <CardTitle className="text-base font-semibold">
            Order #{order.id}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Placed on {order.date}
          </p>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4 mt-4">
        {order.products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md border"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {product.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Quantity: {product.quantity}
              </p>
              <p className="text-sm text-gray-900 font-medium">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
        </div>
        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
          <ChevronRightIcon className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
