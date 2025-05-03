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
import { useWatch } from "@/hooks/use-api/useWatch";
import { useBrand } from "@/hooks/use-api/useBrand";
import { useMaterial } from "@/hooks/use-api/useMaterial";
import { useBandMaterial } from "@/hooks/use-api/useBandMaterial";
import { useMovement } from "@/hooks/use-api/useMovement";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EditWatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getWatchById, updateWatch, isLoading } = useWatch();
  const { brands, getAllBrands } = useBrand();
  const { materials, getAllMaterials } = useMaterial();
  const { bandMaterials, getAllBandMaterials } = useBandMaterial();
  const { movements, getAllMovements } = useMovement();
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    gender: "",
    brandId: "",
    materialId: "",
    bandMaterialId: "",
    movementId: "",
    diameter: 0,
    waterResistance: 0,
    warranty: 0,
    videoUrl: "",
    images: [] as { url: string }[],
  });

  const fetchData = async () => {
    const watch = id ? await getWatchById(id) : null;
    if (watch) {
      setFormData({
        name: watch.name,
        description: watch.description,
        price: watch.price,
        gender: watch.gender,
        brandId: watch.brand?.id || "",
        materialId: watch.material?.id || "",
        bandMaterialId: watch.bandMaterial?.id || "",
        movementId: watch.movement?.id || "",
        diameter: watch.diameter,
        waterResistance: watch.waterResistance,
        warranty: watch.warranty,
        videoUrl: watch.videoUrl || "",
        images: watch.images || [],
      });
    }
  };

  useEffect(() => {
    getAllBrands();
    getAllMaterials();
    getAllBandMaterials();
    getAllMovements();
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const formattedData = {
        ...formData,
        gender: formData.gender as WatchGender,
        images: {
          deleteMany: {},
          create: formData.images.map((img) => ({
            url: img.url,
          })),
        },
      };

      await updateWatch(id, formattedData as any);
      navigate("/admin/watch/list");
    }
  };

  const handleImageUrlAdd = () => {
    if (imageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, { url: imageUrl }],
      });
      setImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
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
          <CardTitle>Edit Watch</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Watch Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                type="url"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                placeholder="Enter video URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MEN">Men</SelectItem>
                  <SelectItem value="WOMEN">Women</SelectItem>
                  <SelectItem value="UNISEX">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-full mt-6">
              <h3 className="text-lg font-medium mb-4">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select
                    value={formData.brandId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, brandId: value })
                    }
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
                    onValueChange={(value) =>
                      setFormData({ ...formData, materialId: value })
                    }
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
                    onValueChange={(value) =>
                      setFormData({ ...formData, bandMaterialId: value })
                    }
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
                  <Label htmlFor="movement">Movement</Label>
                  <Select
                    value={formData.movementId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, movementId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select movement" />
                    </SelectTrigger>
                    <SelectContent>
                      {movements.map((movement: any) => (
                        <SelectItem key={movement.id} value={movement.id}>
                          {movement.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diameter">Diameter (mm)</Label>
                  <Input
                    id="diameter"
                    type="number"
                    value={formData.diameter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        diameter: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waterResistance">Water Resistance (m)</Label>
                  <Input
                    id="waterResistance"
                    type="number"
                    value={formData.waterResistance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        waterResistance: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warranty">Warranty (months)</Label>
                  <Input
                    id="warranty"
                    type="number"
                    value={formData.warranty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        warranty: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="col-span-full space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[100px]"
                required
              />
            </div>

            {/* Images Section */}
            <div className="col-span-full space-y-4">
              <Label>Images</Label>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button type="button" onClick={handleImageUrlAdd}>
                  Add Image
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Watch ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/watch/list")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading("update")}>
              {isLoading("update") ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditWatch;
