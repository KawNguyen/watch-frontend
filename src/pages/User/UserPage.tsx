import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { ShoppingCart, Star, UserRoundPen } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
const routes = [
    {
        name: "Account Information",
        path: "/profile",
        icon: <UserRoundPen />,
    },
    {
        name: "Cart",
        path: "/cart",
        icon: <ShoppingCart />,
    },
    {
        name: "Favorites",
        path: "/favorites",
        icon: <Star />,
    },

];
const UserPage = () => {
    const [routed, setRouted] = useState([]);
    const handleChangeRoute = (abc: any) => {
        setRouted(abc);
    };
    return (
        <main>
            <Toaster />
            <Header />
            <main className="mt-16 md:mt-20 container mx-auto">
                <div className="py-10 space-y-4">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-full md:col-span-3">
                            <div className="flex flex-row  justify-around md:flex-col gap-y-4  border rounded p-4 text-gray-400">
                                {routes.map((route, index) => (
                                    <NavLink
                                        key={index}
                                        onClick={() => handleChangeRoute(route)}
                                        className={({ isActive }) =>
                                            isActive ? "text-black" : "hover:text-black duration-200"
                                        }
                                        to={route.path}
                                    >
                                        <div className="flex gap-x-3 items-center justify-center md:justify-start  ">
                                            <div>{route.icon}</div>
                                            <span className="hidden md:block ">{route.name}</span>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-full md:col-span-9">
                            <div className="p-4 border rounded h-full">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </main>
    );
};

export default UserPage;
