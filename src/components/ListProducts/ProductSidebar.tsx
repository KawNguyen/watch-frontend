import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterX, Filter } from "lucide-react";

interface ProductSidebarProps {
  children?: React.ReactNode;
  onClearFilter?: () => void;
  onApplyFilter?: (value: number) => void;
}

const ProductSidebar = ({
  children,
  onClearFilter,
  onApplyFilter,
}: ProductSidebarProps) => {
  const [priceValue, setPriceValue] = useState(5000);

  const handlePriceChange = (newValue: number[]) => {
    setPriceValue(newValue[0]);
  };

  const handleClearFilter = () => {
    setPriceValue(5000);
    onClearFilter?.();
  };

  const handleApplyFilter = () => {
    onApplyFilter?.(priceValue);
  };

  return (
    <ScrollArea className="h-full w-60">
      <div className="space-y-4">
        {children}
        <div>
          <h2 className="text-lg font-bold mb-4">Price Range</h2>
          <Slider
            min={100}
            max={5000}
            defaultValue={[priceValue]}
            value={[priceValue]}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <p className="text-sm mt-2">
            Price: ${100} - ${priceValue}
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-2">
          <Button variant="outline" onClick={handleClearFilter}>
            <FilterX className="mr-2 h-4 w-4" />
            Clear Filter
          </Button>
          <Button onClick={handleApplyFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ProductSidebar;
