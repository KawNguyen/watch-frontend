import { useState, useEffect } from "react";
import { Search, Eye, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useStockEntry } from "@/hooks/use-api/useStockEntry";
import { formatPrice } from "@/lib/utils";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ManageStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { stockEntries, getAllStockEntries, isLoading, error } =
    useStockEntry();

  useEffect(() => {
    getAllStockEntries();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Stock Entry Records
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 max-w-sm"
                />
              </div>
              <Button onClick={() => navigate("/admin/stock-entry/add")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Stock
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[15%]">Entry ID</TableHead>
                  <TableHead className="w-[15%]">Date</TableHead>
                  <TableHead className="w-[20%]">Added By</TableHead>
                  <TableHead className="w-[20%]">Total Price</TableHead>
                  <TableHead className="w-[20%]">Last Updated</TableHead>
                  <TableHead className="w-[10%] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading("getAll") ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="h-10 w-10 border-4 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-red-500"
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                ) : stockEntries.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      No stock entries found
                    </TableCell>
                  </TableRow>
                ) : (
                  stockEntries.map((entry: any) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{formatDate(entry.createdAt)}</TableCell>
                      <TableCell>{entry.addedBy.name}</TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(entry.totalPrice)}
                      </TableCell>
                      <TableCell>{formatDateTime(entry.updatedAt)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="h-8 px-3"
                            variant="outline"
                            onClick={() => {
                              setSelectedEntry(entry);
                              setShowDetails(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Stock Entry Details</DialogTitle>
              </DialogHeader>
              {selectedEntry && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Entry ID</p>
                      <p className="font-medium">{selectedEntry.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Added By</p>
                      <p className="font-medium">
                        {selectedEntry.addedBy.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created Date</p>
                      <p className="font-medium">
                        {formatDateTime(selectedEntry.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Price</p>
                      <p className="font-medium">${selectedEntry.totalPrice}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Items List</h3>
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="text-right">
                              Quantity
                            </TableHead>
                            <TableHead className="text-right">
                              Unit Price
                            </TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedEntry.items.map(
                            (item: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <img
                                    src={item.watch?.images[0]?.url}
                                    alt={item.watch?.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                  />
                                </TableCell>
                                <TableCell>{item.watch?.name}</TableCell>
                                <TableCell className="text-right">
                                  {item.quantity}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatPrice(item.price)}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatPrice(item.quantity * item.price)}
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageStock;
