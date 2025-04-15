import ProductSidebar from "@/components/ListProducts/ProductSidebar";
import PropsSidebar from "@/components/ListProducts/PropsSidebar";
import { Image } from "@/components/ui/image";
import { useBandMaterial } from "@/hooks/useBandMaterial";
import { useBrand } from "@/hooks/useBrand";
import { useMaterial } from "@/hooks/useMaterial";
import { useMovement } from "@/hooks/useMovement";
import { useEffect } from "react";

export default function ListProduct() {
  const { brands, isLoading: isBrandLoading, getAllBrands } = useBrand();
  const { materials, isLoading: isMaterialLoading, getAllMaterials } = useMaterial();
  const { bandMaterials, isLoading: isBandMaterialLoading, getAllBandMaterials } = useBandMaterial();
  const { movements, isLoading: isMovementLoading, getAllMovements } = useMovement();

  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllBrands();
    getAllMaterials();
    getAllBandMaterials();
    getAllMovements();
  }, []);

  return (
    <div className="w-full">
      <Image
        src="https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/breadcumb.jpg"
        alt="Slider"
        className="w-full object-cover"
        ratio={16/6}
      />
      <div className="flex mx-auto container">
        <ProductSidebar>
          <PropsSidebar isLoading={isBrandLoading} items={brands} title="Brand" />
          <PropsSidebar isLoading={isMaterialLoading} items={materials} title="Material" />
          <PropsSidebar isLoading={isBandMaterialLoading} items={bandMaterials} title="Band Material" />
          <PropsSidebar isLoading={isMovementLoading} items={movements} title="Movement" />
        </ProductSidebar>

        

        {/* <div className="flex-1">
          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
            </div>
          ) : productError ? (
            <div className="p-4 bg-red-100 text-red-700 rounded">
              {productError}
            </div>
          ) : (
            <ProductGrid
              products={currentProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
        </div> */}
      </div>
    </div>
  );
}
