import React, { useState } from "react";
import "../styles/Auth.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const requestOtp = async () => {
    const response = await fetch("http://localhost:5000/login/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile })
    });
    const data = await response.json();
    alert(data.message);
    if (response.ok) setStep(2);
  };

  const verifyOtp = async () => {
    const response = await fetch("http://localhost:5000/login/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp })
    });
    const data = await response.json();
    alert(data.message);
    if (response.ok) {
      localStorage.setItem("token", data.token); // save login token
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {step === 1 && (
        <div className="auth-form">
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={requestOtp}>Send OTP</button>
        </div>
      )}

      {step === 2 && (
        <div className="auth-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}

      <p className="switch-link">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
