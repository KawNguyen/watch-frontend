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
import { useBandMaterial } from "@/hooks/use-api/useBandMaterial";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";

const BandMaterialTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[80%]">Band Material Name</TableHead>
        <TableHead className="w-[20%]">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-8 w-[250px]" />
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

const ManageBandMaterial = () => {
  const navigate = useNavigate();
  const {
    bandMaterials,
    isLoading,
    error,
    getAllBandMaterials,
    deleteBandMaterial,
    updateBandMaterial,
  } = useBandMaterial();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "" });

  useEffect(() => {
    getAllBandMaterials();
  }, []);

  const handleEdit = (bandMaterial: any) => {
    setEditingId(bandMaterial.id);
    setEditData({ name: bandMaterial.name });
  };

  const handleSave = async (id: string) => {
    if (!editData.name.trim()) {
      return;
    }
    await updateBandMaterial(id, editData.name);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteBandMaterial(id);
  };

  if (isLoading("getAllBandMaterials"))
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Band Material Management</CardTitle>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-[300px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BandMaterialTableSkeleton />
        </CardContent>
      </Card>
    );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Band Material Management</CardTitle>
          <div className="flex space-x-2">
            <Input
              placeholder="Search band materials..."
              className="w-[300px]"
            />
            <Button onClick={() => navigate("/admin/band-material/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Band Material
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80%]">Band Material Name</TableHead>
              <TableHead className="w-[20%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bandMaterials.map((bandMaterial: any) => (
              <TableRow key={bandMaterial.id}>
                <TableCell className="font-medium">
                  {editingId === bandMaterial.id ? (
                    <Input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full"
                    />
                  ) : (
                    bandMaterial.name
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {editingId === bandMaterial.id ? (
                      <>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          onClick={() => handleSave(bandMaterial.id)}
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
                          onClick={() => handleEdit(bandMaterial)}
                          variant="ghost"
                        >
                          <Edit />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              className="h-8 px-3"
                              variant="ghost"
                            >
                              <Trash2 className="text-red-600" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Band Material
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete{" "}
                                {bandMaterial.name}? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(bandMaterial.id)}
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

export default ManageBandMaterial;
