import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  watch: any;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export function ProductInfo({ watch, quantity, setQuantity }: ProductInfoProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{watch.name}</h1>
        <p className="text-3xl font-semibold text-primary">
          {formatPrice(watch.price)}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 rounded-lg overflow-hidden">
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
          <Button className="flex-1 h-12 text-base">Add to Cart</Button>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}