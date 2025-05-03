import { useWatch } from "@/hooks/use-api/useWatch";
import { useState, useEffect } from "react";
import ProductCard from "../ListProducts/ProductCard";

interface RelevantProductsProps {
  currentProductId: string;
  brandId: string;
}

export const RelevantProducts = ({
  currentProductId,
  brandId,
}: RelevantProductsProps) => {
  const { getWatchesByBrand } = useWatch();
  const [relevantProducts, setRelevantProducts] = useState([]);

  const fetchRelevantProducts = async () => {
    try {
      const products = await getWatchesByBrand(brandId, 1, 4);
      const filtered = products
        .filter(
          (product: any) =>
            product.id !== currentProductId && product.brandId === brandId,
        )
        .slice(0, 4);
      setRelevantProducts(filtered);
    } catch (error) {
      console.error("Failed to fetch relevant products:", error);
    }
  };

  useEffect(() => {
    fetchRelevantProducts();
  }, [currentProductId, brandId]);

  if (relevantProducts.length === 0) return null;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Similar Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relevantProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
