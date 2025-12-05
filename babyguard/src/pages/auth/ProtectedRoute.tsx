import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode;
  allowedRole: "parent" | "hospital";
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ children, allowedRole }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
