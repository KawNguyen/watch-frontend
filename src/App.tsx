import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import DashboardLayout from "./layouts/AdminLayout";
import CreateBrand from "./pages/Admin/CreateBrand";
import ManageBrand from "./pages/Admin/ManageBrand";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="/admin/brand/list" element={<ManageBrand />} />
        <Route path="/admin/brand/create" element={<CreateBrand />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
