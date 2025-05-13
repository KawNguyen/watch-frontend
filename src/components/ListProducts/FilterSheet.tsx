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
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductSidebar from "./ProductSidebar";
import PropsSidebar from "./PropsSidebar";

interface FilterSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClearFilter: () => void;
  onApplyFilter: () => void;
  onFilterChange: (type: string, value: string) => void;
  filters: {
    gender: string;
    brand: string;
    material: string;
    bandMaterial: string;
    movement: string;
  };
  data: {
    genders: any[];
    brands: any[];
    materials: any[];
    bandMaterials: any[];
    movements: any[];
  };
  loading: {
    brands: boolean;
    materials: boolean;
    bandMaterials: boolean;
    movements: boolean;
  };
}

const FilterSheet = ({
  isOpen,
  onOpenChange,
  onClearFilter,
  onApplyFilter,
  onFilterChange,
  filters,
  data,
  loading,
}: FilterSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
          <SheetDescription>Refine your product search</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] pr-2">
          <div className="mt-4 space-y-4">
            <ProductSidebar
              onClearFilter={onClearFilter}
              onApplyFilter={onApplyFilter}
            >
              <PropsSidebar
                isLoading={false}
                items={data.genders}
                title="Gender"
                onSelect={(value) => onFilterChange("gender", value)}
                selected={[filters.gender]}
              />
              <PropsSidebar
                isLoading={loading.brands}
                items={data.brands}
                title="Brand"
                onSelect={(value) => onFilterChange("brand", value)}
                selected={[filters.brand]}
              />
              <PropsSidebar
                isLoading={loading.materials}
                items={data.materials}
                title="Material"
                onSelect={(value) => onFilterChange("material", value)}
                selected={[filters.material]}
              />
              <PropsSidebar
                isLoading={loading.bandMaterials}
                items={data.bandMaterials}
                title="Band Material"
                onSelect={(value) => onFilterChange("bandMaterial", value)}
                selected={[filters.bandMaterial]}
              />
              <PropsSidebar
                isLoading={loading.movements}
                items={data.movements}
                title="Movement"
                onSelect={(value) => onFilterChange("movement", value)}
                selected={[filters.movement]}
              />
            </ProductSidebar>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
