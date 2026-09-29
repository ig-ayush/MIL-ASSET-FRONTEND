import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAuth();
  if (initializing) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}