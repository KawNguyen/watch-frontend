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
import { Skeleton } from "@/components/ui/skeleton";

import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import { useSearcUser, useUserList } from "@/hooks/use-api-query/useUser";

const CustomerTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[20%]">Name</TableHead>
        <TableHead className="w-[25%]">Email</TableHead>
        <TableHead className="w-[20%]">Phone</TableHead>
        <TableHead className="w-[25%]">Role</TableHead>
        <TableHead className="w-[10%]">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-8 w-[150px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[120px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[200px]" />
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

const ManageUser = () => {
  const { data: usersData, isLoading: loadingUserList, error } = useUserList();

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: searchUsers } = useSearcUser(debouncedSearchTerm);

  const users = usersData?.data?.items || [];
  const results = searchUsers?.data?.items || [];

  if (loadingUserList) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-[300px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CustomerTableSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (error)
    return (
      <div className="text-red-500">
        {error?.message || "An error occurred"}
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Management</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Input
                placeholder="Search customers..."
                className="w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="absolute -bottom-6 left-0 text-sm text-gray-500">
                  Found {results?.length || 0} results
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">Name</TableHead>
              <TableHead className="w-[25%]">Email</TableHead>
              <TableHead className="w-[20%]">Phone</TableHead>
              <TableHead className="w-[25%]">Role</TableHead>
              <TableHead className="w-[10%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(searchTerm ? results : users)?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              (searchTerm ? results : users)?.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="h-8 px-3"
                        onClick={() => {
                          /* Handle view details */
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManageUser;
