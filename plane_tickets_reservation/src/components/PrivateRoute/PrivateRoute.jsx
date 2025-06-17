import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import Header from "../Header/Header";

function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateRoute;
