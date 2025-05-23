import {
  Circle,
  Cog,
  Link,
  Store,
  Watch,
  PackagePlus,
  Users,
  Warehouse,
  Boxes,
  ChartArea,
} from "lucide-react";

export const Routes = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
];

export const Chart = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: ChartArea,
  },
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
    title: "Quantity",
    icon: Boxes,
    children: [{ title: "Manage Quantity", url: "/admin/quantity/list" }],
  },
  {
    title: "Stock Entry",
    icon: Warehouse,
    children: [
      { title: "Manage Stock", url: "/admin/stock-entry/list" },
      { title: "Add Stock", url: "/admin/stock-entry/add" },
    ],
  },
  {
    title: "Order",
    icon: PackagePlus,
    children: [
      { title: "Manage Orders", url: "/admin/order/list" },
      { title: "Create Orders", url: "/admin/order/add" },
    ],
  },
  {
    title: "User",
    icon: Users,
    children: [{ title: "Manage", url: "/admin/user/list" }],
  },
];
