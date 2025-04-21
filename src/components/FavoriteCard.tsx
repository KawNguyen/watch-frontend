// FavoriteCard.tsx
import React from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FavoriteItem = {
  image: string;
  title: string;
  description: string;
};

type FavoriteCardProps = {
  item: FavoriteItem;
  onRemove?: () => void;
};

export const FavoriteCard: React.FC<FavoriteCardProps> = ({
  item,
  onRemove,
}) => {
  return (
    <Card className="relative overflow-hidden">
      {onRemove && (
        <Button
          onClick={onRemove}
          size="icon"
          variant="ghost"
          className="absolute bottom-1 right-1 md:top-16 md:right-10 z-10 text-red-500 hover:bg-red-100"
        >
          <Trash2 className="w-6 h-6" />
        </Button>
      )}
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full h-48 sm:h-auto sm:w-40 flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover rounded-l-xl sm:rounded-l-xl sm:rounded-r-none"
          />
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </CardContent>
      </div>
    </Card>
  );
};
export default FavoriteCard;
