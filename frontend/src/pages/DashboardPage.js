import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Welcome to PrintEase Dashboard</h1>
      <p>Here you can upload and manage your prints.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
