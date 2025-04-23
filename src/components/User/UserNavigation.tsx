import { Link, useSearchParams } from "react-router-dom";
import { User, ShoppingCart, Heart, Package } from "lucide-react";

const navigationItems = [
  {
    label: "Profile Information",
    icon: <User className="w-5 h-5" />,
    href: "?tab=info",
    value: "info",
  },
  {
    label: "My Cart",
    icon: <ShoppingCart className="w-5 h-5" />,
    href: "?tab=cart",
    value: "cart",
  },
  {
    label: "My Favorites",
    icon: <Heart className="w-5 h-5" />,
    href: "?tab=favorites",
    value: "favorites",
  },
  {
    label: "My Orders",
    icon: <Package className="w-5 h-5" />,
    href: "?tab=orders",
    value: "orders",
  },
];

const UserNavigation = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
    <nav className="flex flex-col space-y-1">
      {navigationItems.map((item) => (
        <Link
          key={item.value}
          to={item.href}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            currentTab === item.value
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default UserNavigation;