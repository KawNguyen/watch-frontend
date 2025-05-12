import { useState, useEffect } from "react";
import ProductCard from "../ListProducts/ProductCard";
import { useWatchByBrand } from "@/hooks/use-api-query/useWatch";

interface RelevantProductsProps {
  currentProductId: string;
  brandId: string;
}

export const RelevantProducts = ({
  currentProductId,
  brandId,
}: RelevantProductsProps) => {
  const { data: watchesData, isLoading } = useWatchByBrand(brandId);
  const [relevantProducts, setRelevantProducts] = useState([]);

  useEffect(() => {
    if (watchesData?.data?.items) {
      const filtered = watchesData.data.items
        .filter(
          (product: any) =>
            product.id !== currentProductId && product.brandId === brandId
        )
        .slice(0, 4);
      setRelevantProducts(filtered);
    }
  }, [watchesData, currentProductId, brandId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Similar Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relevantProducts?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
