import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const authContext = useContext(AuthContext);

  if (authContext === null) {
    return null;
  }
  const { isAuthenticated } = authContext;
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
}
