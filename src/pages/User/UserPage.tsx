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
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">My Account</h1>
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-full lg:col-span-3">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <UserNavigation />
                            </div>
                        </div>
                        <div className="col-span-full lg:col-span-9">
                            <div className="bg-white rounded-lg shadow-sm min-h-[600px]">
                                {tab === "info" && <Profile />}
                                {tab === "cart" && <Cart />}
                                {tab === "favorites" && <Favorites />}
                                {tab === "orders" && <Orders />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserPage;
