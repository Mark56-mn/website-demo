import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute() {
  const { session, loading, configured } = useAuth();
  const location = useLocation();

  if (loading) return <div className="auth-loading">Loading secure admin…</div>;
  if (!configured) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
