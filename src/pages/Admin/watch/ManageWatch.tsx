import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import CustomPagination from "@/components/Pagination";
import {
  useDeleteWatch,
  useSearchWatch,
  useWatchesList,
} from "@/hooks/use-api-query/useWatch";

const WatchTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[15%]">Image</TableHead>
        <TableHead className="w-[20%]">Name</TableHead>
        <TableHead className="w-[15%]">Brand</TableHead>
        <TableHead className="w-[10%]">Price</TableHead>
        <TableHead className="w-[10%]">Stock</TableHead>
        <TableHead className="w-[10%]">Gender</TableHead>
        <TableHead className="w-[20%]">Actions</TableHead>
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
            <Skeleton className="h-4 w-[50px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[60px]" />
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ManageWatch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const {
    data: watchesData,
    isLoading,
    isError,
  } = useWatchesList(currentPage, 10);
  const { mutate: mutateDeleteWatch } = useDeleteWatch();
  const watches = watchesData?.data?.items;
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: string) => {
    mutateDeleteWatch(id);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: searchData } = useSearchWatch(debouncedSearchTerm);
  const results = searchData?.data?.items || [];

  if (isError) return <div className="text-red-500">{isError}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Watch Management</CardTitle>
          <div className="flex space-x-4">
            <div className="relative">
              <Input
                placeholder="Search watches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px]"
              />
              {searchTerm && (
                <div className="absolute -bottom-6 left-0 text-sm text-gray-500">
                  Found {results?.length !== 0 ? `${results.length}` : 0} result
                </div>
              )}
            </div>
            <Button onClick={() => navigate("/admin/watch/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Watch
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <WatchTableSkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%]">Image</TableHead>
                <TableHead className="w-[20%]">Name</TableHead>
                <TableHead className="w-[15%]">Brand</TableHead>
                <TableHead className="w-[10%]">Price</TableHead>
                <TableHead className="w-[10%]">Stock</TableHead>
                <TableHead className="w-[10%]">Gender</TableHead>
                <TableHead className="w-[20%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(searchTerm ? results : watches)?.map((watch: any) => (
                <TableRow key={watch.id}>
                  <TableCell>
                    <img
                      src={watch.images[0]?.url}
                      alt={watch.name}
                      className="w-20 h-20 object-contain"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{watch.name}</TableCell>
                  <TableCell>{watch.brand?.name}</TableCell>
                  <TableCell>${watch.price.toLocaleString()}</TableCell>
                  <TableCell>{watch.stock}</TableCell>
                  <TableCell>{watch.gender}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/admin/watch/edit/${watch.id}`)
                        }
                        variant="ghost"
                      >
                        <Edit />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Watch</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {watch.name}? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(watch.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {searchTerm ? (
          <></>
        ) : (
          <div className="mt-4">
            <CustomPagination
              currentPage={currentPage}
              totalPages={watchesData?.meta?.totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageWatch;
