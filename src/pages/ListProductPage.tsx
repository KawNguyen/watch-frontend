import { useEffect, useState } from "react";
import HeroBanner from "@/components/ListProducts/HeroBanner";
import ProductGrid from "@/components/ListProducts/ProductGrid";
import ProductSidebar from "@/components/ListProducts/ProductSidebar";
import PropsSidebar from "@/components/ListProducts/PropsSidebar";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useBandMaterial } from "@/hooks/use-api/useBandMaterial";
import { useBrand } from "@/hooks/use-api/useBrand";
import { useMaterial } from "@/hooks/use-api/useMaterial";
import { useMovement } from "@/hooks/use-api/useMovement";
import { useWatch } from "@/hooks/use-api/useWatch";
import { useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

const genders = [
  { id: "men", name: "Men" },
  { id: "women", name: "Women" },
  { id: "unisex", name: "Unisex" },
];

const ListProductPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [searchParams, setSearchParams] = useSearchParams();

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
  const { getWatchesByFilter, isLoading, totalPages } = useWatch();

  const [watches, setWatches] = useState([]);
  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") || "",
    material: searchParams.get("material") || "",
    bandMaterial: searchParams.get("bandMaterial") || "",
    movement: searchParams.get("movement") || "",
    gender: searchParams.get("gender") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 5000,
    page: Number(searchParams.get("page")) || 1,
    limit: 8,
  });

  const [tempFilters, setTempFilters] = useState({
    brand: filters.brand,
    material: filters.material,
    bandMaterial: filters.bandMaterial,
    movement: filters.movement,
    gender: filters.gender,
  });

  useEffect(() => {
    getAllBrands();
    getAllMaterials();
    getAllBandMaterials();
    getAllMovements();
  }, []);

  useEffect(() => {
    const fetchWatches = async () => {
      const data = await getWatchesByFilter(filters);
      setWatches(data);
    };
    fetchWatches();
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });
    setSearchParams(params);
  }, [filters]);

  const handleFilterChange = (type: string, value: string) => {
    const filterKey =
      type === "bandMaterial" ? "bandMaterial" : type.toLowerCase();
    setTempFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      ...tempFilters,
      page: 1,
    }));
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const cleared = {
      brand: "",
      material: "",
      bandMaterial: "",
      movement: "",
      gender: "",
    };
    setTempFilters(cleared);
    setFilters({
      ...cleared,
      minPrice: 0,
      maxPrice: 5000,
      page: 1,
      limit: 8,
    });
  };

  return (
    <div className="mt-12 w-full min-h-screen bg-gray-50">
      {isDesktop && (
        <HeroBanner
          title="Explore Our Collection"
          description="Discover the latest watches and styles."
          imageUrl="https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/breadcumb.jpg"
        />
      )}

      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {isDesktop ? (
            <div className="space-y-2 w-max">
              <div className="rounded-xl border bg-white p-4 shadow-sm">
                <ProductSidebar
                  onClearFilter={handleClearFilters}
                  onApplyFilter={handleApplyFilters}
                >
                  <PropsSidebar
                    isLoading={false}
                    items={genders}
                    title="Gender"
                    onSelect={(value) => handleFilterChange("gender", value)}
                    selected={[tempFilters.gender]}
                  />
                  <PropsSidebar
                    isLoading={isBrandLoading("getAllBrands")}
                    items={brands}
                    title="Brand"
                    onSelect={(value) => handleFilterChange("brand", value)}
                    selected={[tempFilters.brand]}
                  />
                  <PropsSidebar
                    isLoading={isMaterialLoading("getAllMaterials")}
                    items={materials}
                    title="Material"
                    onSelect={(value) => handleFilterChange("material", value)}
                    selected={[tempFilters.material]}
                  />
                  <PropsSidebar
                    isLoading={isBandMaterialLoading("getAllBandMaterials")}
                    items={bandMaterials}
                    title="Band Material"
                    onSelect={(value) =>
                      handleFilterChange("bandMaterial", value)
                    }
                    selected={[tempFilters.bandMaterial]}
                  />
                  <PropsSidebar
                    isLoading={isMovementLoading("getAllMovements")}
                    items={movements}
                    title="Movement"
                    onSelect={(value) => handleFilterChange("movement", value)}
                    selected={[tempFilters.movement]}
                  />
                </ProductSidebar>
              </div>
            </div>
          ) : (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full mb-4">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Products
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] p-4 bg-white shadow-xl rounded-r-lg"
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-120px)] pr-2">
                  <div className="mt-4 space-y-4">
                    <ProductSidebar
                      onClearFilter={handleClearFilters}
                      onApplyFilter={handleApplyFilters}
                    >
                      <PropsSidebar
                        isLoading={false}
                        items={genders}
                        title="Gender"
                        onSelect={(value) =>
                          handleFilterChange("gender", value)
                        }
                        selected={[tempFilters.gender]}
                      />
                      <PropsSidebar
                        isLoading={isBrandLoading("getAllBrands")}
                        items={brands}
                        title="Brand"
                        onSelect={(value) => handleFilterChange("brand", value)}
                        selected={[tempFilters.brand]}
                      />
                      <PropsSidebar
                        isLoading={isMaterialLoading("getAllMaterials")}
                        items={materials}
                        title="Material"
                        onSelect={(value) =>
                          handleFilterChange("material", value)
                        }
                        selected={[tempFilters.material]}
                      />
                      <PropsSidebar
                        isLoading={isBandMaterialLoading("getAllBandMaterials")}
                        items={bandMaterials}
                        title="Band Material"
                        onSelect={(value) =>
                          handleFilterChange("bandMaterial", value)
                        }
                        selected={[tempFilters.bandMaterial]}
                      />
                      <PropsSidebar
                        isLoading={isMovementLoading("getAllMovements")}
                        items={movements}
                        title="Movement"
                        onSelect={(value) =>
                          handleFilterChange("movement", value)
                        }
                        selected={[tempFilters.movement]}
                      />
                    </ProductSidebar>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          )}

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-2xl font-bold tracking-tight">Our Watches</h2>
              <div className="text-sm text-muted-foreground">
                {watches.length} products found
              </div>
            </div>

            <ProductGrid
              isLoading={isLoading("getByFilter")}
              products={watches}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
              currentPage={filters.page}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductPage;
