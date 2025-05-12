import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { ChevronRight, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "../ui/image";
import { useNavigate } from "react-router-dom";

type BaseProduct = {
  id: string;
  name: string;
  description: string;
  images: [
    {
      url: string;
    },
  ];
  price?: number;
};

type CartProduct = BaseProduct & {
  cartItemId: string;
  quantity: number;
  type: "cart";
  onQuantityChange?: (variables: {
    cartItemId: string;
    quantity: number;
  }) => void;
  onRemove?: () => void;
  isLoadingUpdateQuantity?: boolean;
  isLoadingRemovingFromCart?: boolean;
};

type FavoriteProduct = BaseProduct & {
  type: "favorite";
  onRemove?: () => void;
  isLoadingRemovingFromFavorite?: boolean;
};

type OrderProduct = BaseProduct & {
  type: "order";
  date: string;
  status: string;
  quantity: number;
  onViewDetails?: () => void;
};

type ProductCardProps = CartProduct | FavoriteProduct | OrderProduct;

const ProductCard = (props: ProductCardProps) => {
  const { type, images, name, description } = props;
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
      onClick={() => navigate(`/product/${props.id}`)}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full h-48 sm:h-auto sm:w-44 flex-shrink-0">
          <Image
            src={images[0]?.url}
            alt={name}
            className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
          />
        </div>

        <div className="flex-1 flex flex-col">
          {type === "order" && (
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Order #{props.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed on {props.date}
                  </p>
                </div>
                <span className="capitalize text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {props.status}
                </span>
              </div>
            </CardHeader>
          )}

          <CardContent className="p-4 flex-1">
            <h3 className="font-bold text-xl text-gray-900">{name}</h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {description}
            </p>
          </CardContent>

          {type === "cart" && (
            <CardFooter className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (props.quantity > 1) {
                      props.onQuantityChange?.({
                        cartItemId: props.cartItemId,
                        quantity: props.quantity - 1,
                      });
                    }
                  }}
                  disabled={props.isLoadingUpdateQuantity}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-base font-semibold">
                  {props.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onQuantityChange?.({
                      cartItemId: props.cartItemId,
                      quantity: props.quantity + 1,
                    });
                  }}
                  disabled={props.isLoadingUpdateQuantity}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(props.price! * props.quantity)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onRemove?.();
                  }}
                  disabled={props.isLoadingRemovingFromCart}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </CardFooter>
          )}

          {type === "favorite" && (
            <CardFooter className="p-4 flex justify-between items-center">
              <span className="text-lg font-bold text-primary">
                {formatPrice(props.price!)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onRemove?.();
                }}
                disabled={props.isLoadingRemovingFromFavorite}
              >
                {props.isLoadingRemovingFromFavorite ? (
                  <div>
                    <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </Button>
            </CardFooter>
          )}

          {type === "order" && (
            <>
              <Separator />
              <CardFooter className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    Quantity: {props.quantity}
                  </p>
                  <p className="font-bold text-lg">
                    {formatPrice(props.price!)}
                  </p>
                </div>
                <Button
                  variant="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onViewDetails;
                  }}
                  className="text-primary"
                >
                  View Details
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
