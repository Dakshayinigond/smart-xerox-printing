import React from "react";

const Settings = () => {
  return (
    <div>
      <h1 style={{ color: "#4f46e5" }}>Settings</h1>
      <form style={{ marginTop: "20px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>Admin Name:</label>
          <input type="text" placeholder="Admin Name" style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input type="email" placeholder="Email" style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>
        <div>
          <button type="submit" style={{ background: "#4f46e5", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
