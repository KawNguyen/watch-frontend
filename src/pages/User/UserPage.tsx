import { useSearchParams } from "react-router-dom";
import UserNavigation from "@/components/User/UserNavigation";
import Profile from "@/components/User/Profile";
import Cart from "@/components/User/Cart";
import Favorites from "@/components/User/Favorites";
import Orders from "@/components/User/Orders";

const UserPage = () => {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');
    return (
        <main className="mt-16 md:mt-20 container mx-auto">
            <div className="py-10 space-y-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-full md:col-span-3">
                        <UserNavigation />
                    </div>
                    <div className="col-span-full md:col-span-9">
                        <div className="p-4 border rounded h-full">
                            {tab === "info" && <Profile />}
                            {tab === "cart" && <Cart />}
                            {tab === "favorites" && <Favorites />}
                            {tab === "orders" && <Orders />}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserPage;
