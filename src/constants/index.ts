import { Circle, Cog, Link, Store, Watch,PackagePlus,Users } from "lucide-react";

export const Routes = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
];

export const AdminRoutes = [
  {
    title: "Brand",
    icon: Store,
    children: [
      { title: "Manage Brands", url: "/admin/brand/list" },
      { title: "Add Brand", url: "/admin/brand/add" },
    ],
  },
  {
    title: "Case Material",
    icon: Circle,
    children: [
      { title: "Manage Material", url: "/admin/material/list" },
      { title: "Add Material", url: "/admin/material/add" },
    ],
  },
  {
    title: "Band Material",
    icon: Link,
    children: [
      { title: "Manage Band Material", url: "/admin/band-material/list" },
      { title: "Add Band Material", url: "/admin/band-material/add" },
    ],
  },
  {
    title: "Movement",
    icon: Cog,
    children: [
      { title: "Manage Band Material", url: "/admin/movement/list" },
      { title: "Add Band Material", url: "/admin/movement/add" },
    ],
  },
  {
    title: "Watch",
    icon: Watch,
    children: [
      { title: "Manage Watches", url: "/admin/watch/list" },
      { title: "Add Watch", url: "/admin/watch/add" },
    ],
  },
  {
    title: "Create Orders",
    icon: PackagePlus,
    children: [
      { title: "Add Orders", url: "/admin/createOrders/add" },
    ],
  },
  {
    title: "Customer",
    icon: Users ,
    children: [
      { title: "Manage", url: "/admin/userList/list" },
    ],
  },
];
