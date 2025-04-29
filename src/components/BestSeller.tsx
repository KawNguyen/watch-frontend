import { useState, useEffect } from "react";
import ProductCard from "./ListProducts/ProductCard";
import { useWatch } from "@/hooks/use-api/useWatch";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "AUTOMATIC", path: "Automatic" },
  { name: "QUARTZ", path: "Quartz" },
  { name: "MECHANICAL", path: "Mechanical" },
];

const BestSeller = () => {
  const navigate = useNavigate();
  const { getWatchesByMovement, isLoading } = useWatch();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);
  const limit = 4;

  const fetchWatches = async () => {
    try {
      const data = await getWatchesByMovement(activeCategory.path, 1, limit);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching watches:", error);
    }
  };

  useEffect(() => {
    fetchWatches();
  }, [activeCategory.path]);

  const handleShowMore = () => {
    navigate(`/products?movement=${activeCategory.path}`);
  };

  const ProductSkeleton = () => (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          <Skeleton className="h-[240px] w-full rounded-lg" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ))}
    </>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Featured Collections
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our premium timepieces by movement type
          </p>
        </div>

        <div className="w-full overflow-x-auto scroll-smooth mb-12 no-scrollbar">
          <div className="flex justify-start sm:justify-center w-fit mx-auto gap-4 sm:gap-6 md:gap-8 px-4 py-2">
            {categories.map((category) => (
              <button
                key={category.path}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 text-sm sm:text-base font-medium rounded-full whitespace-nowrap transition-all duration-300 
                  ${
                    activeCategory.path === category.path
                      ? "bg-gray-900 text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {isLoading("getByMovement") ? (
            <ProductSkeleton />
          ) : (
            products.map((product: any) => (
              <div
                key={product.name}
                className="transform transition-transform duration-300 hover:scale-105"
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>

        {products.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleShowMore}
              disabled={isLoading("getByMovement")}
              className="group relative px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all duration-300 flex items-center gap-2"
            >
              {isLoading("getByMovement") ? (
                "Loading..."
              ) : (
                <>
                  <span>View Collection</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
