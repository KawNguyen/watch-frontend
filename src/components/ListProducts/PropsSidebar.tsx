import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const PropsSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3, 4].map((index) => (
      <div key={index} className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
);

interface PropsSidebarProps {
  isLoading: boolean;
  items: any[];
  title: string;
  onSelect: (value: string) => void;
  selected: string[];
}

const PropsSidebar = ({
  isLoading,
  items,
  title,
  onSelect,
  selected,
}: PropsSidebarProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">{title}</h3>
      {isLoading ? (
        <PropsSkeleton />
      ) : (
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={`${title}-${item.id}`}
                checked={selected.includes(item.name)}
                onCheckedChange={(checked) => {
                  onSelect(checked ? item.name : "");
                }}
              />
              <Label
                htmlFor={`${title}-${item.id}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {item.name}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropsSidebar;
