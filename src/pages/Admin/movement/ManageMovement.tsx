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
import { useMovement } from "@/hooks/use-api/useMovement";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MovementTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead className="w-[200px]">Actions</TableHead>
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

const ManageMovement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const {
    movements,
    isLoading,
    getAllMovements,
    deleteMovement,
    updateMovement,
  } = useMovement();

  const handleEdit = (movement: any) => {
    setEditingId(movement.id);
    setEditingName(movement.name);
  };

  const handleSave = async () => {
    if (editingId && editingName.trim()) {
      await updateMovement(editingId, editingName.trim());
      setEditingId(null);
      setEditingName("");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  useEffect(() => {
    getAllMovements();
  }, []);

  if (isLoading("getAllMovements"))
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Movement Management</CardTitle>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-[300px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MovementTableSkeleton />
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Movement Management</CardTitle>
          <div className="flex space-x-2">
            <Input
              placeholder="Search movements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
            <Button onClick={() => navigate("/admin/movement/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Movement
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((movement: any) => (
              <TableRow key={movement.id}>
                <TableCell className="font-medium">
                  {editingId === movement.id ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    movement.name
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {editingId === movement.id ? (
                      <>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          variant="ghost"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          variant="ghost"
                          onClick={() => handleEdit(movement)}
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
                                Delete Movement
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {movement.name}?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMovement(movement.id)}
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

export default ManageMovement;
