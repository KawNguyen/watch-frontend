import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductInfoProps {
  watchId: string;
  stock: any[];
  price: number;
  onAddToCart: (id: string, quantity: number) => void;
  onFavorite: (id: string) => void;
  isLoadingAddingToCart?: boolean;
  isLoadingAddingToFavorite?: boolean;
}

export function ProductInfo({
  watchId,
  stock,
  price,
  onAddToCart,
  onFavorite,
  isLoadingAddingToCart,
  isLoadingAddingToFavorite,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = price * quantity;

  const isOutOfStock = stock[0]?.quantity === 0 || stock.length === 0;
  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-around">
        <div className="flex items-center  border-2 rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="hover:bg-gray-100"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-16 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <p className="text-3xl font-semibold text-primary">
            {formatPrice(totalPrice)}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {isOutOfStock ? (
            <Button
              variant={"secondary"}
              disabled={isOutOfStock}
              onClick={() => onAddToCart(watchId, quantity)}
              className="flex-1 h-12 text-base"
            >
              Out of Stock
            </Button>
          ) : (
            <Button
              disabled={isLoadingAddingToCart}
              onClick={() => onAddToCart(watchId, quantity)}
              className="flex-1 h-12 text-base"
            >
              Add to Cart
            </Button>
          )}
          <Button
            disabled={isLoadingAddingToFavorite}
            variant="outline"
            size="icon"
            className="h-12 w-12"
            onClick={() => onFavorite(watchId)}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
