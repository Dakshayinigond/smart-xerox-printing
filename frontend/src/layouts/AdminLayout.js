// src/layouts/AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <main style={{
        flex: 1,
        padding: "30px",
        marginLeft: "220px", // same as sidebar width
        backgroundColor: "#f3f4f6",
        minHeight: "100vh"
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
