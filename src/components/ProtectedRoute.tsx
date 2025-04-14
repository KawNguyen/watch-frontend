import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRole: string;
  userRole: string;
  children: React.ReactNode;
}

const ProtectedRoute = ({
  allowedRole,
  userRole,
  children,
}: ProtectedRouteProps) => {
  if (userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
