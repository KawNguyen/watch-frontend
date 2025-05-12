import { useSearchParams } from "react-router-dom";
import UserNavigation from "@/components/User/UserNavigation";
import Profile from "@/components/User/Profile";
import Cart from "@/components/User/Cart";
import Favorites from "@/components/User/Favorites";
import Orders from "@/components/User/Orders";
import { useAuth } from "@/hooks/use-api/useAuth";
import { useMutation } from "@/hooks/use-mutation";
import { user } from "@/api/user";
import { toast } from "sonner";
import { useUserData } from "@/hooks/use-api-query/useUser";

const UserPage = () => {
  const { getUser } = useAuth();
  const currentUser = getUser();
  const userId = currentUser?.id;

  const { data: userData, isLoading, refetch } = useUserData(userId);
  const profile = userData?.data?.item;

  const mutationUpdate = useMutation({
    mutationFn: (updatedUserData: any) =>
      user.updateUser(userId, updatedUserData),
    onSuccess: (res: any) => {
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success("Update profile successfully");
      refetch();
    },
  });

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          <div className="flex gap-6">
            <div className="hidden lg:block w-64">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <UserNavigation />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm min-h-[600px] mb-16 lg:mb-0">
                {tab === "info" && (
                  <Profile
                    user={profile}
                    updateUser={mutationUpdate.mutate}
                    isLoadingGetUser={isLoading}
                    isLoadingUpdateUser={mutationUpdate.isLoading}
                  />
                )}
                {tab === "cart" && <Cart />}
                {tab === "favorites" && <Favorites />}
                {tab === "orders" && <Orders />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 lg:hidden">
        <div className="bg-white">
          <UserNavigation variant="icon" />
        </div>
      </div>
    </main>
  );
};

export default UserPage;
