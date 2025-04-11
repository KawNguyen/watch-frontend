import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Helmet } from "react-helmet-async";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Toaster />
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="ml-2">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
