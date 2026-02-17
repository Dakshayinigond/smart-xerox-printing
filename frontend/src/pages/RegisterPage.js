import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UploadContext } from "../context/UploadContext";
import "../styles/LoginPage.css"; // same styles as login

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { loginUser } = useContext(UploadContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        loginUser(data.user); // save user in context
        setMessage(`✅ Welcome ${data.user.name}! Redirecting...`);
        setTimeout(() => navigate("/upload"), 1500);
      } else {
        setMessage(data.message || "⚠️ Registration failed!");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error connecting to server!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="switch-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
