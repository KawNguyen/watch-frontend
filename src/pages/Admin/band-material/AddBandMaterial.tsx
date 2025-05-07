import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBandMaterial } from "@/hooks/use-api/useBandMaterial";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddBandMaterial = () => {
  const navigate = useNavigate();
  const { createBandMaterial, isLoading } = useBandMaterial();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createBandMaterial(name);
    navigate("/admin/band-material/list");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/band-material/list")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Add New Band Material</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="name">Band Material Name</Label>
            <Input
              id="name"
              placeholder="Enter band material name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading("createBandMaterial")} className="w-full">
              {isLoading("createBandMaterial") ? "Creating..." : "Create Band Material"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/band-material/list")}
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

export default AddBandMaterial;
