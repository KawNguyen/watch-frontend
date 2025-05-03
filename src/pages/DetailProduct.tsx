import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWatch } from "@/hooks/use-api/useWatch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductImages } from "@/components/ProductDetail/ProductImages";
import { ProductInfo } from "@/components/ProductDetail/ProductInfo";
import { ProductTabs } from "@/components/ProductDetail/ProductTabs";
import { ProductName } from "@/components/ProductDetail/ProductName";
import { ProductFeatures } from "@/components/ProductDetail/ProductFetures";
import { RelevantProducts } from "@/components/ProductDetail/RelevantProducts";
import { useCart } from "@/hooks/use-api/useCart";
import { useFavorite } from "@/hooks/use-api/useFavorite";

const DetailProduct = () => {
  const { id } = useParams();
  const { getWatchById } = useWatch();
  const { addToCart } = useCart();
  const { addToFavorite } = useFavorite();
  const [watch, setWatch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!watch?.id) return;
    try {
      await addToCart(watch.id, quantity);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleAddToFavorite = async () => {
    if (!watch?.id) return;
    try {
      await addToFavorite(watch.id);
    } catch (error) {
      console.error("Failed to add to favorite:", error);
    }
  };

  const fetchWatch = async () => {
    if (id) {
      try {
        const data = await getWatchById(id);
        setWatch(data);
      } catch (error) {
        console.error("Failed to fetch watch:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWatch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="h-[500px] w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }
  if (!watch) {
    return (
      <div className="container mx-auto py-10 text-center">
        Product not found
      </div>
    );
  }
  return (
    <div className="container mx-auto py-24 px-4 ">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{watch.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImages images={watch.images} name={watch.name} />
        <div className="flex flex-col h-full">
          <ProductName name={watch.name} />
          <div className="flex-grow">
            <ProductTabs
              description={watch.description}
              specifications={watch}
            />
          </div>
          <ProductInfo
            price={watch.price}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            onFavorite={handleAddToFavorite}
          />
        </div>
      </div>
      <div>
        <ProductFeatures watch={watch} />
        <RelevantProducts
          currentProductId={watch.id}
          brandId={watch.brand?.id}
        />
      </div>
    </div>
  );
};

export default DetailProduct;
