import { Routes } from "@/constants";
import { Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container mx-auto bg-white h-20 w-full">
      <div className="h-full flex justify-between items-center">
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

        <div className="text-4xl">
            LOGO
        </div>

        <div className="flex space-x-4 w-[32%] justify-end">
          <div>
            <Search />
          </div>
          <div>
            <ShoppingBag/>
          </div>
          <div>
            <User/>
          </div>    
        </div>
      </div>
    </header>
  );
};

export default Header;
