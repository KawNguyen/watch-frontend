import { ShoppingCart, Star, Truck, UserRoundPen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const routes = [
    {
        name: "Account Information",
        icon: <UserRoundPen />,
        tab: "info"
    },
    {
        name: "Cart",
        icon: <ShoppingCart />,
        tab: "cart"
    },
    {
        name: "Favorites",
        icon: <Star />,
        tab: "favorites"
    },
    {
        name: "Orders",
        icon: <Truck />,
        tab: "orders    "
    },
];

const UserNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (route: typeof routes[0]) => {
        navigate({
            pathname: '/profile',
            search: `?tab=${route.tab}`
        });
    };

    const isActive = (tab: string) => {
        return new URLSearchParams(location.search).get('tab') === tab;
    };

    return (
        <div className="flex flex-row justify-around md:flex-col gap-y-4 border rounded p-4 text-gray-400">
            {routes.map((route, index) => (
                <div
                    key={index}
                    onClick={() => handleNavigation(route)}
                    className={`cursor-pointer ${isActive(route.tab)
                        ? "text-black"
                        : "hover:text-black duration-200"
                        }`}
                >
                    <div className="flex gap-x-3 items-center justify-center md:justify-start">
                        <div>{route.icon}</div>
                        <span className="hidden md:block">{route.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserNavigation;