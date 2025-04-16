import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface PropsSidebarProps {
  items: any[];
  title: string;
  isLoading?: boolean;
}

const PropsSidebar = ({ items, title, isLoading = false }: PropsSidebarProps) => {  
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between w-full border-l-4 border-black pl-6">
          <h2 className="text-lg font-bold">{title}</h2>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer text-gray-700 hover:text-blue-500 transition-colors"
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PropsSidebar;
