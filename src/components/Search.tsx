import { useEffect, useState } from "react";
import { Search as SearchIcon, Clock, Tag, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/useDebounce";
import { useWatch } from "@/hooks/use-api/useWatch";
import { Separator } from "@/components/ui/separator";
import Image from "./ui/image";

export function Search() {
  const [open, setOpen] = useState(false);
  const { searchWatches, isLoading } = useWatch();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.trim()) {
        const results = await searchWatches(debouncedSearch);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  const categories = [
    { 
      name: "Luxury Timepieces", 
      path: "/products?category=luxury",
      icon: Crown,
      description: "Discover our premium collection of luxury watches"
    },
    { 
      name: "Sport & Active", 
      path: "/products?category=sport",
      icon: Clock,
      description: "Perfect companions for your active lifestyle"
    },
    { 
      name: "Special Offers", 
      path: "/products?category=smart",
      icon: Tag,
      description: "Exclusive deals on selected timepieces"
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 text-base hover:text-zinc-500 transition-colors">
          <SearchIcon className="h-5 w-5" />
          <span className="hidden md:inline-flex">Search</span>
          <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </SheetTrigger>
      <SheetContent side="top" className="w-full h-[85vh] overflow-y-auto">
        <div className="max-w-4xl mx-auto pb-8">
          <SheetHeader className="sticky top-0 bg-white pb-6 z-10">
            <SheetTitle className="text-3xl font-bold">Search Collection</SheetTitle>
            <SheetDescription className="text-lg">
              Find your perfect timepiece
            </SheetDescription>
            <div className="mt-6">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <Input
                  type="search"
                  placeholder="Search by name, brand, or material..."
                  className="h-14 pl-12 pr-4 text-lg rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </SheetHeader>
          
          <div className="mt-6">
            {isLoading("search") && (
              <div className="mt-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-800"></div>
              </div>
            )}

            {!isLoading("search") && searchResults.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-zinc-500 mb-4">Search Results</h3>
                <div className="grid gap-3">
                  {searchResults.map((watch: any) => (
                    <Button
                      key={watch.id}
                      variant="ghost"
                      className="w-full p-4 justify-start text-left hover:bg-zinc-100/80 rounded-xl transition-all duration-300 h-auto group border border-transparent hover:border-zinc-200 hover:shadow-sm"
                      onClick={() => {
                        navigate(`/product/${watch.id}`);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center w-full gap-8">
                        <div className="relative h-28 w-28 rounded-xl overflow-hidden bg-zinc-100 shadow-sm">
                          <Image
                            src={watch.images[0]?.url || '/placeholder-watch.png'}
                            alt={watch.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-xl tracking-tight truncate text-zinc-900">{watch.name}</h3>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-sm font-medium text-zinc-800">{watch.brand.name}</span>
                                <span className="text-zinc-400">•</span>
                                <span className="text-sm text-zinc-600">{watch.code}</span>
                              </div>
                            </div>
                            <span className="text-xl font-bold whitespace-nowrap text-zinc-900">
                              ${watch.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3">
                            <div className="flex items-center gap-2 text-sm text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full">
                              <span>{watch.diameter}mm</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full">
                              <span>{watch.material.name}</span>
                            </div>
                            {watch.waterResistance && (
                              <div className="flex items-center gap-2 text-sm text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full">
                                <span>{watch.waterResistance}m Water Resistant</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {!isLoading("search") && search && searchResults.length === 0 && (
              <div className="mt-8 text-center">
                <p className="text-lg text-zinc-500">No watches found for "{search}"</p>
                <p className="text-sm text-zinc-400 mt-1">Try searching with different terms</p>
              </div>
            )}

            {!search && (
              <>
                <Separator className="my-8" />
                <div className="space-y-6">
                  <h3 className="text-sm font-medium text-zinc-500">Browse Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <Button
                        key={category.path}
                        variant="outline"
                        className="h-auto p-6 justify-start text-left hover:bg-zinc-100 rounded-xl transition-all "
                        onClick={() => {
                          navigate(category.path);
                          setOpen(false);
                        }}
                      >
                        <div>
                          <category.icon className="h-6 w-6 mb-4" />
                          <h3 className="text-lg font-medium">{category.name}</h3>
                          <p className="text-sm text-zinc-500 mt-1 text-wrap">{category.description}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}