import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "../ui/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface WatchData {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
}

const ProductCard = ({ product }: { product: WatchData }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="group relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-80 overflow-hidden">
        <AspectRatio ratio={1} className="w-full">
          <Image
            src={product.images[0]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </AspectRatio>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="secondary" className="hover:bg-black hover:text-white" >
                  <ShoppingBag className="h-4 w-4"/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Cart</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="secondary" className="hover:bg-black hover:text-white" onClick={()=> navigate(`/product/${product?.id}`)}>
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick View</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="secondary" className="hover:bg-black hover:text-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <CardContent className="flex flex-col items-center text-center p-4 h-[120px]">
        <h3 className="text-base font-semibold line-clamp-2 mb-2">
          {product.name}
        </h3>
        <p className="text-primary font-bold text-lg text-red-500">
          {formatPrice(product.price)}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
