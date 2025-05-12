import { useParams } from "react-router-dom";
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

import { useCartContext } from "@/context/CartContext";
import { useFavoriteContext } from "@/context/FavoriteContext";
import { useWatchById } from "@/hooks/use-api-query/useWatch";

const DetailProduct = () => {
  const { id } = useParams();
  const { addToCart, isLoadingAddingToCart } = useCartContext();
  const { addToFavorite, isLoadingAddToFavorite } = useFavoriteContext();
  const { data: watchData, isLoading } = useWatchById(id ?? "");

  const watch = watchData?.data?.item;
  console.log(watch);

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
            watchId={watch.id}
            stock={watch.quantities}
            price={watch.price}
            onAddToCart={addToCart}
            onFavorite={addToFavorite}
            isLoadingAddingToCart={isLoadingAddingToCart}
            isLoadingAddingToFavorite={isLoadingAddToFavorite}
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
