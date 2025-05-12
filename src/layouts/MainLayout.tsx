import Footer from "@/components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const MainLayout = () => {
  return (
    <main>
      <Toaster position="top-right" />
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
