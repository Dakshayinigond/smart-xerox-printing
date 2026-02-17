import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarUpload() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user"); // Clear login info
      navigate("/login");
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ margin: 0 }}>PrintEase</h2>
      <div style={{ display: "flex", gap: "25px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/upload" style={{ color: "white", textDecoration: "none" }}>
          Upload & Print
        </Link>
        <Link to="/book-slot" style={{ color: "white", textDecoration: "none" }}>
          Book Slot
        </Link>
       
        <Link to="/history" style={{ color: "white", textDecoration: "none" }}>
          History
        </Link>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid white",
            borderRadius: "8px",
            padding: "5px 12px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavbarUpload;
