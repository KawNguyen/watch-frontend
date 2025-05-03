import { useState, useEffect } from "react";
import { useWatch } from "@/hooks/use-api/useWatch";
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
import { useStockEntry } from "@/hooks/use-api/useStockEntry";

interface StockItem {
  watchId: string;
  quantity: number;
  price: number;
}

const AddStock = () => {
  const navigate = useNavigate();
  const { createStockEntry } = useStockEntry();
  const [items, setItems] = useState<StockItem[]>([
    { watchId: "", quantity: 1, price: 0 },
  ]);

  const { watches, getAllWatches } = useWatch();

  useEffect(() => {
    getAllWatches(1, 100);
  }, []);

  const addItem = () => {
    setItems([...items, { watchId: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof StockItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === "watchId") {
      const selectedWatch = watches.find((watch: any) => watch.id === value);
      if (selectedWatch) {
        newItems[index].price = (selectedWatch as { price: number }).price;
      }
    }

    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validItems = items.filter(
        (item) => item.watchId && item.quantity > 0,
      );
      if (validItems.length === 0) {
        throw new Error("Please add at least one valid item");
      }

      await createStockEntry({ items });
      navigate("/admin/stock-entry/list");
    } catch (error) {
      console.error("Failed to create stock entry:", error);
    }
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
            <div key={index} className="space-y-4 border-b pb-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12">
                  <label className="text-sm font-medium mb-2 block">
                    Product
                  </label>
                  <Select
                    value={item.watchId}
                    onValueChange={(value) =>
                      updateItem(index, "watchId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {watches.map((watch: any) => (
                        <SelectItem key={watch.id} value={watch.id}>
                          {watch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {item.watchId && (
                <>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
                    {watches.map(
                      (watch: any) =>
                        watch.id === item.watchId && (
                          <div
                            key={watch.id}
                            className="flex items-center gap-4 w-full"
                          >
                            <img
                              src={watch.images[0].url}
                              alt={watch.name}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <div className="flex-grow">
                              <h3 className="text-lg font-semibold">
                                {watch.name}
                              </h3>
                              <p className="font-medium">{watch.brand.name}</p>
                              <p className="text-sm text-gray-600">
                                ${watch.price}
                              </p>
                            </div>
                          </div>
                        ),
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-4 items-center mt-4">
                    <div className="col-span-5">
                      <label className="text-sm font-medium mb-2 block">
                        Quantity
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>

                    <div className="col-span-5">
                      <label className="text-sm font-medium mb-2 block">
                        Unit Price ($)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>

                    <div className="col-span-2 self-end">
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
                </>
              )}
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
              onClick={() => navigate("/admin/stock-entry/list")}
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
