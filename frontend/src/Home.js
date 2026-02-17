import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // redirect to login page
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">PrintEase</div>
        <ul className="nav-links">
          <li>Features</li>
          <li>Upload</li>
          <li>Contact</li>
        </ul>
        <div className="profile">D</div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Simplify Your <span>College Printing</span> Experience
        </h1>
        <p>Upload, Print & Collect – hassle-free, paper-ready service for students</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started <span className="arrow">→</span>
          </button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">
            {/* SVG icon */}
          </div>
          <h3>Upload</h3>
          <p>Send your documents</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            {/* SVG icon */}
          </div>
          <h3>Print</h3>
          <p>We handle the printing</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            {/* SVG icon */}
          </div>
          <h3>Collect</h3>
          <p>Pick up when ready</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
