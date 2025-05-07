import { useEffect } from "react";
import { Routes } from "@/constants";
import { useGlobalStore } from "@/store/useGlobalStore";
import {
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  ShoppingBag,
  UserCog,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-api/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "./ui/image";
import { Search } from "./Search";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { isAuthenticated, logout, getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();
  const { cartCount, favoriteCount, fetchCounts, resetCounts } =
    useGlobalStore();

  useEffect(() => {
    if (user?.id) {
      fetchCounts(user?.id);
    } else {
      resetCounts();
    }
  }, [user?.id]);

  const handleCheckSignIn = (redirectTo: string) => {
    if (!isAuthenticated()) {
      navigate("/auth/login");
    } else {
      navigate(redirectTo);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCounts(user?.id);
    }
  }, [user?.id]);

  return (
    <header className="fixed top-0 bg-white h-20 w-full z-50">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <div className="hidden md:flex space-x-4 w-[32%]">
          {Routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="text-xl hover:text-zinc-500"
            >
              {route.name}
            </Link>
          ))}
        </div>

        <MobileMenu />

        <Link to="/" className="flex-shrink-0">
          <Image
            src="/Images/logo.png"
            alt="logo"
            className="h-16 w-16 md:h-24 md:w-24"
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4 w-auto md:w-[32%] justify-end">
          <div className="hidden md:block">
            <Search />
          </div>
          <div className="hidden md:block relative">
            <Heart
              onClick={() => handleCheckSignIn("/profile?tab=favorites")}
              className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
            />
            {favoriteCount >= 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {favoriteCount}
              </span>
            )}
          </div>
          <div className="cursor-pointer relative">
            <ShoppingBag
              onClick={() => handleCheckSignIn("/profile?tab=cart")}
              className="h-5 w-5 md:h-6 md:w-6"
            />
            {cartCount >= 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </div>
          <div className="hidden md:block">
            {isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/profile?tab=info")}
                  >
                    <UserCog />
                    Profile
                  </DropdownMenuItem>
                  {user?.role === "ADMIN" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <LayoutDashboard />
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth/login">
                <LogIn className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
