import { Link, useSearchParams } from "react-router-dom";
import { User, ShoppingCart, Heart, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserNavigationProps {
  variant?: "default" | "icon";
}

const UserNavigation = ({ variant = "default" }: UserNavigationProps) => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "info";

  const navItems = [
    { icon: <User className="h-5 w-5" />, label: "Profile", value: "info" },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Cart",
      value: "cart",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Favorites",
      value: "favorites",
    },
    { icon: <Package className="h-5 w-5" />, label: "Orders", value: "orders" },
  ];

  return (
    <nav
      className={cn(
        "flex gap-2",
        variant === "default"
          ? "flex-col"
          : "flex-row justify-evenly items-center py-4",
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.value}
          to={`/profile?tab=${item.value}`}
          className={cn(
            "flex items-center transition-colors",
            currentTab === item.value
              ? "text-primary"
              : "text-muted-foreground hover:text-primary",
            variant === "default"
              ? "gap-3 px-3 py-2 rounded-md hover:bg-muted"
              : "p-2",
          )}
          title={variant === "icon" ? item.label : undefined}
        >
          {item.icon}
          {variant === "default" && <span>{item.label}</span>}
        </Link>
      ))}
    </nav>
  );
};

export default UserNavigation;
