import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWatch } from "@/hooks/useWatch";
import { useBrand } from "@/hooks/useBrand";
import { useMaterial } from "@/hooks/useMaterial";
import { useBandMaterial } from "@/hooks/useBandMaterial";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddWatch = () => {
  const navigate = useNavigate();
  const { createWatch, isLoading } = useWatch();
  const { brands, getAllBrands } = useBrand();
  const { materials, getAllMaterials } = useMaterial();
  const { bandMaterials, getAllBandMaterials } = useBandMaterial();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    gender: "MALE",
    brandId: "",
    materialId: "",
    bandMaterialId: "",
    movementId: "",
    stock: 0,
    diameter: 0,
    waterResistance: 0,
    warranty: 0,
    images: [] as { url: string }[],
  });

  useEffect(() => {
    getAllBrands();
    getAllMaterials();
    getAllBandMaterials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createWatch(formData as { 
      name: string;
      description: string;
      price: number;
      gender: "MALE" | "FEMALE" | "UNISEX";
      brandId: string;
      materialId: string;
      bandMaterialId: string;
      movementId: string;
      stock: number;
      diameter: number;
      waterResistance: number;
      warranty: number;
      images: { url: string }[];
    });
    navigate("/admin/watch/list");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUrls = files.map(file => ({
      url: URL.createObjectURL(file)
    }));
    setFormData({ ...formData, images: imageUrls });
  };

  const [imageUrl, setImageUrl] = useState("");

  const handleImageUrlAdd = () => {
    if (imageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, { url: imageUrl }]
      });
      setImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/watch/list")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Add New Watch</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Watch Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="UNISEX">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={formData.brandId}
                onValueChange={(value) => setFormData({ ...formData, brandId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand: any) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="material">Case Material</Label>
              <Select
                value={formData.materialId}
                onValueChange={(value) => setFormData({ ...formData, materialId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((material: any) => (
                    <SelectItem key={material.id} value={material.id}>
                      {material.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bandMaterial">Band Material</Label>
              <Select
                value={formData.bandMaterialId}
                onValueChange={(value) => setFormData({ ...formData, bandMaterialId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select band material" />
                </SelectTrigger>
                <SelectContent>
                  {bandMaterials.map((material: any) => (
                    <SelectItem key={material.id} value={material.id}>
                      {material.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diameter">Diameter (mm)</Label>
              <Input
                id="diameter"
                type="number"
                value={formData.diameter}
                onChange={(e) => setFormData({ ...formData, diameter: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waterResistance">Water Resistance (m)</Label>
              <Input
                id="waterResistance"
                type="number"
                value={formData.waterResistance}
                onChange={(e) => setFormData({ ...formData, waterResistance: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warranty">Warranty (months)</Label>
              <Input
                id="warranty"
                type="number"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Images</Label>
            
            <div className="space-y-2">
              <Label>Upload Images</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Add Image URL</Label>
              <div className="flex gap-2">
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                />
                <Button
                  type="button"
                  onClick={handleImageUrlAdd}
                  className="whitespace-nowrap"
                >
                  Add URL
                </Button>
              </div>
            </div>
          </div>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Watch preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Watch"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/watch/list")}
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

export default AddWatch;