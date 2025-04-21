import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductSidebarProps {
  children?: React.ReactNode;
}

const ProductSidebar = ({ children }: ProductSidebarProps) => {
  const [priceValue, setPriceValue] = useState(90);

  const handlePriceChange = (newValue: number[]) => {
    setPriceValue(newValue[0]);
  };

  return (
    <ScrollArea className="h-full w-60">
      <div className="py-6 space-y-6">
        {children}
        <div>
          <h2 className="text-lg font-bold mb-4">Price Range</h2>
          <Slider
            min={0}
            max={100}
            defaultValue={[priceValue]}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <p className="text-sm mt-2">Price: $0 - ${priceValue}</p>
        </div>

        <div className="pt-4">
          <Button className="w-full">Apply Filters</Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ProductSidebar;
