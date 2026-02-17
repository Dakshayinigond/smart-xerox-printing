import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Smart Printing</h2>
      <ul className="nav-links">
        <li>
          <Link to="/upload">Upload & Print</Link>
        </li>
        <li>
          <Link to="/bookslot">Book Slot</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
