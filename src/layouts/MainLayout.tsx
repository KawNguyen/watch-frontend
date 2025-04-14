import Footer from "@/components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <main>
      <Toaster />
      <Header />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
