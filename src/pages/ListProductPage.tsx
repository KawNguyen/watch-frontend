import HeroBanner from "@/components/ListProducts/HeroBanner";
import ProductGrid from "@/components/ListProducts/ProductGrid";
import ProductSidebar from "@/components/ListProducts/ProductSidebar";
import PropsSidebar from "@/components/ListProducts/PropsSidebar";
import { useBandMaterial } from "@/hooks/use-api/useBandMaterial";
import { useBrand } from "@/hooks/use-api/useBrand";
import { useMaterial } from "@/hooks/use-api/useMaterial";
import { useMovement } from "@/hooks/use-api/useMovement";
import { useWatch } from "@/hooks/use-api/useWatch";
import { useEffect } from "react";


const ListProductPage = () => {
  const { brands, isLoading: isBrandLoading, getAllBrands } = useBrand();
  const {
    materials,
    isLoading: isMaterialLoading,
    getAllMaterials,
  } = useMaterial();
  const {
    bandMaterials,
    isLoading: isBandMaterialLoading,
    getAllBandMaterials,
  } = useBandMaterial();
  const {
    movements,
    isLoading: isMovementLoading,
    getAllMovements,
  } = useMovement();
  const { watches, isLoading: isWatchLoading, getAllWatches } = useWatch();

  useEffect(() => {
    getAllBrands();
    getAllMaterials();
    getAllBandMaterials();
    getAllMovements();
    getAllWatches();
  }, []);

  return (
    <div className="w-full">
      <HeroBanner
        title="Explore Our Collection"
        description="Discover the latest watches and styles."
        imageUrl="https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/breadcumb.jpg"
      />
      
      <div className="flex mx-auto container gap-10">
        <ProductSidebar>
          <PropsSidebar
            isLoading={isBrandLoading}
            items={brands}
            title="Brand"
          />
          <PropsSidebar
            isLoading={isMaterialLoading}
            items={materials}
            title="Material"
          />
          <PropsSidebar
            isLoading={isBandMaterialLoading}
            items={bandMaterials}
            title="Band Material"
          />
          <PropsSidebar
            isLoading={isMovementLoading}
            items={movements}
            title="Movement"
          />
        </ProductSidebar>

        <div className="w-full">
          <ProductGrid isLoading={isWatchLoading} products={watches} />
        </div>
      </div>
    </div>
  );
};

export default ListProductPage;
