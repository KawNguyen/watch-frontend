import { Route, Routes } from "react-router-dom";
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
import UserPage from "./pages/User/UserPage";
import ContactPage from "./pages/ContactPage";
import TermOfUsePage from "./pages/TermOfUsePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ShippingAndReturns from "./pages/ShippingAndReturns";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import ManageMovement from "./pages/Admin/movement/ManageMovement";
import AddMovement from "./pages/Admin/movement/AddMovement";
import ListProductPage from "./pages/ListProductPage";
import DetailProduct from "./pages/DetailProduct";
import CreateOrders from "./pages/Admin/create-orders/CreateOrders";
import EditWatch from "./pages/Admin/watch/EditWatch";
import { useAuth } from "./hooks/use-api/useAuth";
import ManageStock from "./pages/Admin/stock-entry/ManageStock";
import AddStock from "./pages/Admin/stock-entry/AddStock";
import ManageQuantity from "./pages/Admin/quantity/ManageQuantity";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ManageUser from "./pages/Admin/user/ManageUser";

const App = () => {
  const { getUser } = useAuth();
  const user = getUser();
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/term-of-use" element={<TermOfUsePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/shipping-return" element={<ShippingAndReturns />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/products" element={<ListProductPage />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute userRole={user?.role} allowedRole="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index path="brand/list" element={<ManageBrand />} />
        <Route path="brand/add" element={<AddBrand />} />
        <Route path="watch/list" element={<ManageWatch />} />
        <Route path="watch/add" element={<AddWatch />} />
        <Route path="watch/edit/:id" element={<EditWatch />} />
        <Route path="material/list" element={<ManageMaterial />} />
        <Route path="material/add" element={<AddMaterial />} />
        <Route path="band-material/list" element={<ManageBandMaterial />} />
        <Route path="band-material/add" element={<AddBandMaterial />} />
        <Route path="movement/list" element={<ManageMovement />} />
        <Route path="movement/add" element={<AddMovement />} />
        <Route path="create-orders/add" element={<CreateOrders />} />
        <Route path="user/list" element={<ManageUser />} />
        <Route path="stock-entry/list" element={<ManageStock />} />
        <Route path="stock-entry/add" element={<AddStock />} />
        <Route path="quantity/list" element={<ManageQuantity />} />
      </Route>
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
