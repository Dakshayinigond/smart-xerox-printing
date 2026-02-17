import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div style={{
      width: "250px",
      minHeight: "100vh",
      background: "#6a11cb",
      color: "#fff",
      padding: "30px"
    }}>
      <h2>Admin Panel</h2>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
        <li><Link to="/admin" style={linkStyle}>Dashboard</Link></li>

        <li><Link to="/admin/users" style={linkStyle}>Users</Link></li>
        <li><Link to="/admin/settings" style={linkStyle}>Settings</Link></li>
      </ul>
    </div>
  );
};

const linkStyle = {
  color: "#fff",
  display: "block",
  padding: "10px 0",
  textDecoration: "none",
  fontWeight: "500"
};

export default AdminSidebar;
