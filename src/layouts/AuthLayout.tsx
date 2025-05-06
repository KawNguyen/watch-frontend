import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main>
      <Toaster />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
