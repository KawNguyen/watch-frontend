import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import CustomPagination from "@/components/Pagination";

const ProductSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-[320px] w-full rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

interface ProductGridProps {
  isLoading: boolean;
  products: any[];
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const ProductGrid = ({ 
  isLoading, 
  products, 
  onPageChange, 
  currentPage,
  totalPages 
}: ProductGridProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <ProductSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductGrid;
