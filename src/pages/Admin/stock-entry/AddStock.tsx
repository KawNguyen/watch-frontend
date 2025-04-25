import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StockItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

const AddStock = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<StockItem[]>([
    { productId: "", quantity: 1, unitPrice: 0 },
  ]);

  // Mock data - replace with actual data from your API
  const products = [
    { id: "1", name: "Rolex Submariner" },
    { id: "2", name: "Omega Seamaster" },
  ];

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof StockItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call here
    console.log("Submitting:", items);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Add Stock Entry</CardTitle>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/stock/list")}
            >
              Manage Stock Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center border-b pb-4"
            >
              <div className="col-span-5">
                <label className="text-sm font-medium mb-2 block">
                  Product
                </label>
                <Select
                  value={item.productId}
                  onValueChange={(value) =>
                    updateItem(index, "productId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-3">
                <label className="text-sm font-medium mb-2 block">
                  Quantity
                </label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value))
                  }
                />
              </div>

              <div className="col-span-3">
                <label className="text-sm font-medium mb-2 block">
                  Unit Price ($)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateItem(index, "unitPrice", parseFloat(e.target.value))
                  }
                />
              </div>

              <div className="col-span-1 self-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <div className="text-lg font-semibold">
              Total: ${calculateTotal().toLocaleString()}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/stock")}
            >
              Cancel
            </Button>
            <Button type="submit">Save Stock Entry</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddStock;