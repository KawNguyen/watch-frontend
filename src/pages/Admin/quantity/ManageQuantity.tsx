import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import CustomPagination from "@/components/Pagination";
import { formatDateTime } from "@/lib/utils";
import { useQuantity } from "@/hooks/use-api/useQuantity";
import useDebounce from "@/hooks/useDebounce";

const QuantityTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[15%]">Image</TableHead>
        <TableHead className="w-[20%]">Product Name</TableHead>
        <TableHead className="w-[15%]">Brand</TableHead>
        <TableHead className="w-[15%]">Quantity</TableHead>
        <TableHead className="w-[20%]">Last Updated</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-20 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ManageQuantity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const {
    quantities,
    totalPages,
    isLoading,
    error,
    getAllQuantities,
    searchQuantities,
  } = useQuantity();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = async () => {
    if (debouncedSearchTerm) {
      const results = await searchQuantities(
        debouncedSearchTerm,
        currentPage,
        10
      );
      console.log(results)
      setSearchResults(results || []);
    } else {
      setSearchResults([]);
      await getAllQuantities(currentPage, 10);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm, currentPage]);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Stock Quantity Management</CardTitle>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-[300px]"
              />
              {searchTerm && (
                <div className="absolute -bottom-6 left-0 text-sm text-gray-500">
                  Found {searchResults?.length || 0} results
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading("getAll") ? (
          <QuantityTableSkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%]">Image</TableHead>
                <TableHead className="w-[20%]">Product Name</TableHead>
                <TableHead className="w-[15%]">Brand</TableHead>
                <TableHead className="w-[15%]">Quantity</TableHead>
                <TableHead className="w-[20%]">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(searchTerm ? searchResults : quantities).map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.watch.images[0]?.url}
                      alt={item.watch.name}
                      className="w-20 h-20 object-contain"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.watch.name}
                  </TableCell>
                  <TableCell>{item.watch.brand.name}</TableCell>
                  <TableCell className="font-medium">{item.quantity}</TableCell>
                  <TableCell>{formatDateTime(item.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="mt-4">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageQuantity;
