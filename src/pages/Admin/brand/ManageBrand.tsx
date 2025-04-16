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
import { useBrand } from "@/hooks/useBrand";
import { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const BrandTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[10%]">Logo</TableHead>
        <TableHead className="w-[40%]">Brand Name</TableHead>
        <TableHead className="w-[40%]">Country</TableHead>
        <TableHead className="w-[10%]">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-16 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[200px]" />
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

const ManageBrand = () => {
  const { brands, isLoading, error, getAllBrands, deleteBrand, updateBrand } =
    useBrand();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", country: "" });
  const navigate = useNavigate();

  useEffect(() => {
    getAllBrands();
  }, []);

  const handleEdit = (brand: any) => {
    setEditingId(brand.id);
    setEditData({ name: brand.name, country: brand.country });
  };

  const handleSave = async (id: number) => {
    if (!editData.name.trim() || !editData.country.trim()) {
      alert("Brand name and country cannot be empty.");
      return;
    }
    await updateBrand(id, editData.name, editData.country);
    setEditingId(null);
    getAllBrands();
  };

  const handleDelete = async (id: number) => {
    await deleteBrand(id);
  };

  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Brand Management</CardTitle>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-[300px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BrandTableSkeleton />
        </CardContent>
      </Card>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Brand Management</CardTitle>
          <div className="flex space-x-2">
            <Input placeholder="Search brands..." className="w-[300px]" />
            <Button onClick={() => navigate("/admin/brand/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Brand
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">Logo</TableHead>
              <TableHead className="w-[40%]">Brand Name</TableHead>
              <TableHead className="w-[40%]">Country</TableHead>
              <TableHead className="w-[10%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand: any) => (
              <TableRow key={brand.id}>
                <TableCell className="w-24">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 object-contain"
                  />
                </TableCell>
                <TableCell className="w-64 font-medium">
                  {editingId === brand.id ? (
                    <Input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full"
                    />
                  ) : (
                    brand.name
                  )}
                </TableCell>
                <TableCell className="w-48">
                  {editingId === brand.id ? (
                    <Input
                      value={editData.country}
                      onChange={(e) =>
                        setEditData({ ...editData, country: e.target.value })
                      }
                      className="w-full"
                    />
                  ) : (
                    brand.country
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {editingId === brand.id ? (
                      <>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          onClick={() => handleSave(brand.id)}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          onClick={() => handleEdit(brand)}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              className="h-8 px-3"
                              variant="destructive"
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Brand</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {brand.name}?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(brand.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManageBrand;
