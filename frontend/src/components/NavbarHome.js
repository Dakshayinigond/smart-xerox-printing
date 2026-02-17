// src/components/NavbarHome.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarHome() {
  const navigate = useNavigate();

  // Inline styles
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#8b5d8bff",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer"
  };

  const ulStyle = {
    listStyle: "none",
    display: "flex",
    gap: "25px",
    alignItems: "center",
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    cursor: "pointer"
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle} onClick={() => navigate("/")}>
        PrintEase
      </div>
      <ul style={ulStyle}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        <li><Link to="/feature" style={linkStyle}>Feature</Link></li>
        <li><Link to="/contact" style={linkStyle}>Contact Us</Link></li>
        <li><Link to="/login" style={linkStyle}>Login</Link></li>
      </ul>
    </nav>
  );
}

export default NavbarHome;
