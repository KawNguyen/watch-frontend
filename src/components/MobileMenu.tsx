import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Menu,
  LogIn,
  LogOut,
  UserCog,
  LayoutDashboard,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "@/constants";
import { useAuth } from "@/hooks/use-api/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetClose } from "@/components/ui/sheet";
import { useState } from "react";

const MobileMenu = () => {
  const { isAuthenticated, logout, getUser } = useAuth();
  const [open, setOpen] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] flex flex-col">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetDescription className="text-left">
            Explore the features of our platform.
          </SheetDescription>
          <div className="flex-1">
            <div className="flex flex-col space-y-4">
              {Routes.map((route) => (
                <SheetClose asChild key={route.path}>
                  <Link to={route.path} className="text-xl hover:text-zinc-500">
                    {route.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 mt-auto">
            {isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-3 outline-none w-full hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                  <Avatar>
                    <AvatarImage src={user?.avatar} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-gray-900">
                      {user?.name}
                    </span>
                    <span className="text-sm text-gray-500">{user?.email}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      navigate("/profile?tab=info"), setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      navigate("/profile?tab=orders"), setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      navigate("/profile?tab=favorites"), setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Favorite
                  </DropdownMenuItem>
                  {user?.role === "ADMIN" && (
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/admin/dashboard"), setOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center space-x-2 text-xl hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
