import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import UserCard from "./UserCard";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavoriteContext } from "@/context/FavoriteContext";

const Favorites = () => {
  const {
    data: favorites,
    isLoading,
    removeFromFavorite,
    favoriteCount,
    isLoadingRemoveFromFavorite,
  } = useFavoriteContext();

  const items = favorites?.data.items || [];

  return (
    <UserCard
      title="Favorites"
      icon={<Heart className="h-4 w-4" />}
      count={favoriteCount}
    >
      <ScrollArea className="h-[calc(100vh-22rem)]">
        <div className="flex flex-col gap-4">
          {isLoading ? (
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
          ) : favoriteCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">No favorites yet</h3>
              <p className="text-muted-foreground">
                Items you favorite will appear here
              </p>
            </div>
          ) : (
            items.map((item: any) => (
              <ProductCard
                key={item.id}
                {...item.watch}
                type="favorite"
                onRemove={() => removeFromFavorite(item.watchId)}
                isLoadingRemovingFromFavorite={isLoadingRemoveFromFavorite}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </UserCard>
  );
};

export default Favorites;
