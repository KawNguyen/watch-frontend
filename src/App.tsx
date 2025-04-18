import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AddBrand from "./pages/Admin/brand/AddBrand";
import ManageBrand from "./pages/Admin/brand/ManageBrand";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageWatch from "./pages/Admin/watch/ManageWatch";
import ManageMaterial from "./pages/Admin/material/ManageMaterial";
import AddWatch from "./pages/Admin/watch/AddWatch";
import AddMaterial from "./pages/Admin/material/AddMaterial";
import ManageBandMaterial from "./pages/Admin/band-material/ManageBandMaterial";
import AddBandMaterial from "./pages/Admin/band-material/AddBandMaterial";
import ManageMovement from "./pages/Admin/movement/ManageMovement";
import AddMovement from "./pages/Admin/movement/AddMovement";
import ListProductPage from "./pages/ListProductPage";
import DetailProduct from "./pages/DetailProduct";

const App = () => {
  const { getUser } = useAuth();
  const user = getUser();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ListProductPage />} />
        <Route path="/product/:id" element={<DetailProduct />} />
      </Route>
      
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute userRole={user?.role} allowedRole="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index path="/admin/brand/list" element={<ManageBrand />} />
        <Route path="/admin/brand/add" element={<AddBrand />} />
        <Route path="/admin/watch/list" element={<ManageWatch />} />
        <Route path="/admin/watch/add" element={<AddWatch />} />
        <Route path="/admin/material/list" element={<ManageMaterial />} />
        <Route path="/admin/material/add" element={<AddMaterial />} />
        <Route path="/admin/band-material/list" element={<ManageBandMaterial />} />
        <Route path="/admin/band-material/add" element={<AddBandMaterial />} />
        <Route path="/admin/movement/list" element={<ManageMovement />} />
        <Route path="/admin/movement/add" element={<AddMovement />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
