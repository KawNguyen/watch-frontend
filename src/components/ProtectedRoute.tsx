import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  userRole: string | undefined;
  allowedRole?: string; // optional
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRole, userRole, children }: ProtectedRouteProps) => {
  if (!userRole) {
    // Nếu chưa đăng nhập
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Nếu có giới hạn role mà sai
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
