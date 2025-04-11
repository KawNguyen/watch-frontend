import { Tag } from "lucide-react";

export const Routes = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const AdminRoutes = [
  {
    title: "Brand",
    icon: Tag,
    children: [
      { title: "Manage Brands", url: "/admin/brand/list" },
      { title: "Create Brand", url: "/admin/brand/create" },
    ],
  },
];
