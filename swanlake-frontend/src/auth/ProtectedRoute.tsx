import React from "react";
import { Navigate } from "react-router-dom";
import UserService from "../service/UserService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = UserService.isAuthenticated();

  if (!isAuthenticated) {
    // Jika tidak login, arahkan ke halaman login
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
