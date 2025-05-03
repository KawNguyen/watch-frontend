import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, Clock, Crown, Tag, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { useWatch } from "@/hooks/use-api/useWatch";
import useDebounce from "@/hooks/useDebounce";

const categories = [
  {
    name: "Luxury Timepieces",
    path: "/products?category=luxury",
    icon: Crown,
    description: "Discover our premium collection of luxury watches",
  },
  {
    name: "Sport & Active",
    path: "/products?category=sport",
    icon: Clock,
    description: "Perfect companions for your active lifestyle",
  },
  {
    name: "Special Offers",
    path: "/products?category=smart",
    icon: Tag,
    description: "Exclusive deals on selected timepieces",
  },
];

const highlightKeywords = [
  "Rolex",
  "Omega",
  "Gold",
  "Chronograph",
  "Automatic",
  "Carbon Fiber",
];

export function Search() {
  const [open, setOpen] = useState(false);
  const { searchWatches, isLoading } = useWatch();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      setRecentSearches(stored);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isCmdK =
        (isMac && e.metaKey && e.key === "k") ||
        (!isMac && e.ctrlKey && e.key === "k");

      if (isCmdK) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const saveSearch = (keyword: string) => {
    const updated = [
      keyword,
      ...recentSearches.filter((k) => k !== keyword),
    ].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const fetchResults = async () => {
    if (debouncedSearch.trim()) {
      const results = await searchWatches(debouncedSearch, 1, 10);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [debouncedSearch]);

  const handleKeywordClick = (keyword: string) => {
    setSearch(keyword);
    saveSearch(keyword);
  };

  const clearRecent = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

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

      <SheetContent side="top" className="w-full h-[85vh] overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <SheetHeader className="bg-white pb-2">
            <SheetTitle className="text-3xl font-bold text-zinc-900">
              Search Collection
            </SheetTitle>
            <SheetDescription className="text-lg text-zinc-600">
              Find your perfect timepiece
            </SheetDescription>
            <div className="mt-6">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <Input
                  type="search"
                  placeholder="Search by name, brand, or material..."
                  className="h-14 pl-12 pr-4 text-lg rounded-xl shadow-md focus-visible:ring-2 ring-zinc-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </SheetHeader>

          <div className="mt-8 h-[calc(85vh-200px)] overflow-y-auto pr-2">
            {isLoading("search") && (
              <div className="flex justify-center mt-12">
                <div className="h-10 w-10 border-4 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
              </div>
            )}

            {!isLoading("search") && searchResults.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-zinc-500 mb-4">
                  Search Results
                </h3>
                <div className="grid gap-4">
                  {searchResults.map((watch: any) => (
                    <Button
                      key={watch.id}
                      variant="ghost"
                      className="w-full p-4 justify-start text-left hover:bg-zinc-100 rounded-xl transition duration-300 h-auto group border border-transparent hover:border-zinc-200 hover:shadow-md"
                      onClick={() => {
                        navigate(`/product/${watch.id}`);
                        setOpen(false);
                        saveSearch(search);
                      }}
                    >
                      <div className="flex items-center w-full gap-6">
                        <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-zinc-100 shadow-sm">
                          <Image
                            src={
                              watch.images[0]?.url || "/placeholder-watch.png"
                            }
                            alt={watch.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-lg truncate text-zinc-900">
                                {watch.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1 text-sm text-zinc-500">
                                <span>{watch.brand.name}</span>
                                <span>•</span>
                                <span>{watch.code}</span>
                              </div>
                            </div>
                            <span className="text-lg font-semibold text-zinc-900 whitespace-nowrap">
                              ${watch.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
                            <span className="bg-zinc-100 px-3 py-1 rounded-full text-zinc-600">
                              {watch.diameter}mm
                            </span>
                            <span className="bg-zinc-100 px-3 py-1 rounded-full text-zinc-600">
                              {watch.material.name}
                            </span>
                            {watch.waterResistance && (
                              <span className="bg-zinc-100 px-3 py-1 rounded-full text-zinc-600">
                                {watch.waterResistance}m Water Resistant
                              </span>
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
              <div className="mt-12 text-center space-y-2">
                <p className="text-xl font-medium text-zinc-500">
                  No watches found for “{search}”
                </p>
                <p className="text-sm text-zinc-400">
                  Try searching with different terms
                </p>
              </div>
            )}

            {!search && (
              <>
                {recentSearches.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-zinc-500">
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecent}
                        className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((keyword) => (
                        <Button
                          key={keyword}
                          variant="outline"
                          size="sm"
                          className="rounded-full px-4 text-sm"
                          onClick={() => handleKeywordClick(keyword)}
                        >
                          {keyword}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-10">
                  <h3 className="text-sm font-semibold text-zinc-500 mb-4">
                    Popular Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {highlightKeywords.map((keyword) => (
                      <Button
                        key={keyword}
                        variant="outline"
                        size="sm"
                        className="rounded-full px-4 text-sm"
                        onClick={() => handleKeywordClick(keyword)}
                      >
                        {keyword}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="my-10" />

                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-zinc-500">
                    Browse Categories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <Button
                        key={category.path}
                        variant="outline"
                        className="h-auto p-6 text-left hover:bg-zinc-100 rounded-2xl transition-all border border-zinc-200 shadow-sm"
                        onClick={() => {
                          navigate(category.path);
                          setOpen(false);
                        }}
                      >
                        <div className="flex flex-col ">
                          <category.icon className="h-6 w-6 mb-4 text-zinc-700" />
                          <h3 className="text-lg font-semibold text-zinc-800">
                            {category.name}
                          </h3>
                          <p className="text-sm text-zinc-500 mt-1 text-wrap">
                            {category.description}
                          </p>
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
