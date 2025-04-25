import { Routes } from "@/constants";
import {
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

const Header = () => {
  const { isAuthenticated, logout, getUser } = useAuth();
  const user = getUser();

  const navigate = useNavigate();

  return (
    <header className="fixed top-0 bg-white h-20 w-full z-50 ">
      <div className="container mx-auto h-full flex justify-between items-center">
        <div className="flex space-x-4 w-[32%]">
          {Routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`text-xl hover:text-zinc-500`}
            >
              {route.name}
            </Link>
          ))}
        </div>

        <Link to="/">
          <Image src="/Images/logo.png" alt="logo" className="h-24 w-24" />
        </Link>

        <div className="flex space-x-4 w-[32%] justify-end items-center">
          <Search />
          <div className="cursor-pointer">
            <ShoppingBag onClick={() => navigate("/profile?tab=orders")} />
          </div>

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
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile?tab=info")}>
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
              <LogIn />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
