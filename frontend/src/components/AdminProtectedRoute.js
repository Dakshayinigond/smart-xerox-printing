import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin"); // check admin login

  if (!isAdmin) {
    return <Navigate to="/admin-login" />; // redirect if not admin
  }

  return children;
};

export default AdminProtectedRoute;
