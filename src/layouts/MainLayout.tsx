import Footer from "@/components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
