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
import { useMaterial } from "@/hooks/use-api/useMaterial";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";

const MaterialTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[80%]">Material Name</TableHead>
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

const ManageMaterial = () => {
  const {
    materials,
    isLoading,
    error,
    getAllMaterials,
    deleteMaterial,
    updateMaterial,
  } = useMaterial();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    getAllMaterials();
  }, []);

  const handleEdit = (material: any) => {
    setEditingId(material.id);
    setEditData({ name: material.name });
  };

  const handleSave = async (id: string) => {
    if (!editData.name.trim()) {
      return;
    }
    await updateMaterial(id, editData.name);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteMaterial(id);
  };

  if (isLoading("getAllMaterials"))
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Material Management</CardTitle>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-[300px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MaterialTableSkeleton />
        </CardContent>
      </Card>
    );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Material Management</CardTitle>
          <div className="flex space-x-2">
            <Input placeholder="Search materials..." className="w-[300px]" />
            <Button onClick={() => navigate("/admin/material/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80%]">Material Name</TableHead>
              <TableHead className="w-[20%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material: any) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">
                  {editingId === material.id ? (
                    <Input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full"
                    />
                  ) : (
                    material.name
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {editingId === material.id ? (
                      <>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          onClick={() => handleSave(material.id)}
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
                          onClick={() => handleEdit(material)}
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
                                Delete Material
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {material.name}?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(material.id)}
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

export default ManageMaterial;
