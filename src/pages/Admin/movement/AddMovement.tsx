import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMovement } from "@/hooks/use-api/useMovement";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddMovement = () => {
  const navigate = useNavigate();
  const { createMovement, isLoading } = useMovement();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMovement(name);
    navigate("/admin/movement/list");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/movement/list")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Add New Movement</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="name">Movement Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter movement name"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading("createMovement")} className="w-full">
              {isLoading("createMovement") ? "Creating..." : "Create Movement"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/movement/list")}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMovement;
