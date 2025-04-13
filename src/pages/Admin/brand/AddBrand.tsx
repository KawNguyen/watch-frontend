import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBrand } from "@/hooks/useBrand";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddBrand = () => {
  const navigate = useNavigate();
  const { createBrand, isLoading } = useBrand();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    logo: "",
    logoFile: null as File | null,
    isUrl: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isUrl) {
      await createBrand(formData.name, formData.country, formData.logo);
    } else if (formData.logoFile) {
      await createBrand(formData.name, formData.country, formData.logo);
    }
    navigate("/admin/brand/list");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        setFormData({
          ...formData,
          logoFile: file,
          logo: URL.createObjectURL(file),
          isUrl: false
        });
      }
    } else if (e.target.name === "logo") {
      setFormData({
        ...formData,
        logo: e.target.value,
        logoFile: null,
        isUrl: true
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/brand/list")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Create New Brand</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="name">Brand Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter brand name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              placeholder="Enter country of origin"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Brand Logo</Label>
            <div className="space-y-4">
              <Input
                placeholder="Enter image URL"
                name="logo"
                value={formData.isUrl ? formData.logo : ""}
                onChange={handleChange}
              />
              <div className="- my-2 text-sm text-gray-500">Or</div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          {formData.logo && (
            <div className="mt-4">
              <img
                src={formData.logo}
                alt="Brand Logo Preview"
                className="w-32 h-32 object-contain border rounded"
              />
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Brand"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/brands")}
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

export default AddBrand;
