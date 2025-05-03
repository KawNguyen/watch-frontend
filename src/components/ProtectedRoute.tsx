import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRole: string;
  userRole: string;
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({
  allowedRole,
  userRole,
  children,
  redirectTo,
}: ProtectedRouteProps) => {
  if (userRole !== allowedRole) {
    return <Navigate to={redirectTo || "/"} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
