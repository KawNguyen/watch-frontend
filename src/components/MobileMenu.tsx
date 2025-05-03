import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, LogIn, LogOut, UserCog, LayoutDashboard } from "lucide-react";
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

const MobileMenu = () => {
  const { isAuthenticated, logout, getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  return (
    <div className="md:hidden">
      <Sheet>
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
                <DropdownMenuTrigger className="flex items-center space-x-2 outline-none w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/profile?tab=info")}
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  {user?.role === "ADMIN" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
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
              <Link
                to="/auth/login"
                className="flex items-center space-x-2 text-xl hover:text-zinc-500"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
