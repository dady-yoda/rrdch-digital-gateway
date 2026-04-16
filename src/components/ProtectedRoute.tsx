import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import type { Role } from "@/lib/config";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  allowedRoles?: Role[];
}

/**
 * Wraps a route so only authenticated users (with the correct role) can access it.
 * Unauthenticated users are sent to /login.
 * Wrong-role users are redirected to their own home.
 */
export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, isLoading, roleHome } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#546B41", borderTopColor: "transparent" }}
          />
          <p className="text-sm text-gray-500 font-medium">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleHome} replace />;
  }

  return <>{children}</>;
}
