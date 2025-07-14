import { Navigate } from "react-router-dom";
import { useAuth } from "../context/use-auth";
import type { JSX } from "react";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role?: "hr" | "employee";
}) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
