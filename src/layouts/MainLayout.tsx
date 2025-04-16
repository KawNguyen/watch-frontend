import Footer from "@/components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <main>
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
