import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import UserCard from "./UserCard";
import ProductCard from "./ProductCard";
import { useFavorite } from "@/hooks/use-api/useFavorite";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Favorites = () => {
  const { favorites, getUserFavorite, removeFromFavorite, isLoading } =
    useFavorite();

  useEffect(() => {
    getUserFavorite();
  }, []);

  const handleRemoveFromFavorite = async(watchId: string) => {
    await removeFromFavorite(watchId);
    getUserFavorite();
  };

  return (
    <UserCard
      title="Favorites"
      icon={<Heart className="h-4 w-4" />}
      count={favorites.length}
    >
      <ScrollArea className="h-[calc(100vh-22rem)]">
        <div className="flex flex-col gap-4">
          {isLoading("getUserFavorite") ? (
            <>
              <div className="flex gap-4 items-center">
                <Skeleton className="h-24 w-24 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Skeleton className="h-24 w-24 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            </>
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">No favorites yet</h3>
              <p className="text-muted-foreground">
                Items you favorite will appear here
              </p>
            </div>
          ) : (
            favorites.map((item) => (
              <ProductCard
                key={item.id}
                {...item.watch}
                type="favorite"
                onRemove={() => handleRemoveFromFavorite(item.watchId)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </UserCard>
  );
};

export default Favorites;
