import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWatch } from "@/hooks/use-api/useWatch";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductImages } from "@/components/ProductDetail/ProductImages";
import { ProductInfo } from "@/components/ProductDetail/ProductInfo";
import { ProductTabs } from "@/components/ProductDetail/ProductTabs";
import { ProductName } from "@/components/ProductDetail/ProductName";
import { ProductFeatures } from "@/components/ProductDetail/ProductFetures";
import { ProductTrailer } from "@/components/ProductDetail/ProductTrailer";
import { RelevantProducts } from "@/components/ProductDetail/RelevantProducts";

const DetailProduct = () => {
  const { id } = useParams();
  const { getWatchById } = useWatch();
  const [watch, setWatch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const fetchWatch = async () => {
    if (id) {
      try {
        const data = await getWatchById(id);
        console.log(data)
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
    return <div className="container mx-auto py-10 text-center">Product not found</div>;
  }
  return (
    <div className="container mx-auto py-24 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
        <ProductImages images={watch.images} name={watch.name} />
        <div className="md:mt-10 ">
          <ProductName name={watch.name} />
          <ProductTabs description={watch.description} specifications={watch} />
          <ProductInfo watch={watch} quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
      <div>
        <ProductFeatures name={watch.name} />
        <RelevantProducts currentProductId={watch.id} category={watch.category} />
      </div>
    </div>
  );
};

export default DetailProduct;
