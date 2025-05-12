import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useMutation } from "@/hooks/use-mutation";
import { order } from "@/api/order";
import { useAllOrder } from "@/hooks/use-api-query/useOrder";

const OrderTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Total Price</TableHead>
        <TableHead>Created At</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-8 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[150px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[150px]" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

const ManageOrders = () => {
  const { data: orderData, isLoading, isError, refetch } = useAllOrder();
  const data = orderData?.data.items ?? [];
  const updateStatus = useMutation({
    mutationFn: async (variables: { orderId: string; status: OrderStatus }) => {
      await order.updateStatus(
        variables.orderId,
        variables.status as OrderStatus
      );
    },
    onSuccess: () => {
      console.log("Order status updated successfully");
      refetch();
    },

    onError: (error: any) => {
      console.error("Error updating order status:", error);
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTableSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return <div>Error loading orders</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center" style={{ width: "200px" }}>Email</TableHead>
              <TableHead className="text-center" style={{ width: "150px" }}>Name</TableHead>
              <TableHead className="text-center" style={{ width: "130px" }}>Phone</TableHead>
              <TableHead className="text-center" style={{ width: "140px" }}>Status</TableHead>
              <TableHead className="text-center" style={{ width: "120px" }}>Total Price</TableHead>
              <TableHead className="text-center" style={{ width: "160px" }}>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="text-center" style={{ width: "200px" }}>{order.user.email}</TableCell>
                <TableCell className="text-center" style={{ width: "150px" }}>{order.user.name}</TableCell>
                <TableCell className="text-center" style={{ width: "130px" }}>{order.user.phone}</TableCell>
                <TableCell className="text-center" style={{ width: "140px" }}>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      updateStatus.mutate({
                        orderId: order.id,
                        status: value as OrderStatus,
                      })
                    }
                    disabled={updateStatus.isLoading}
                  >
                    <SelectTrigger>{order.status}</SelectTrigger>
                    <SelectContent>
                      {Object.values(OrderStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center" style={{ width: "120px" }}>${order.totalPrice}</TableCell>
                <TableCell className="text-center" style={{ width: "160px" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManageOrders;
