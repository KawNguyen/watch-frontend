import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main>
      <Toaster />
      <Header />
      <Outlet />
    </main>
  );
};

export default AuthLayout;