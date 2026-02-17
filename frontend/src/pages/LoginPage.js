import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UploadContext } from "../context/UploadContext";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { loginUser } = useContext(UploadContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("⚠️ Please enter email and password!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        loginUser(data.user);
        setMessage(`✅ Welcome ${data.user.name}! Redirecting...`);
        setTimeout(() => navigate("/upload"), 1500);
      } else {
        setMessage(data.message || "⚠️ Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error connecting to server!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="switch-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
