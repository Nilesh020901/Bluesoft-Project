import { Navigate } from "react-router-dom";
import { useAuth } from "../context/use-auth";
import type { JSX } from "react";

const ProtectedRoute = ({ children, role }: { children: JSX.Element; role?: "hr" | "employee" }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;