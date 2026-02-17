// src/pages/FeaturePage.js
import React from "react";
import "./FeaturePage.css";

function FeaturePage() {
  return (
    <div className="feature-page">
      <header className="feature-hero">
        <h1>Our Features</h1>
        <p>PrintEase offers a seamless and smart printing experience for college students.</p>
      </header>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📤</div>
          <h3>Upload Documents</h3>
          <p>Quickly upload PDFs and documents online without visiting the store.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚙️</div>
          <h3>Custom Print Settings</h3>
          <p>Select color, sides, number of copies, and pages to print exactly what you need.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🕒</div>
          <h3>Slot Booking</h3>
          <p>Book a convenient time slot to collect your printed documents hassle-free.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📜</div>
          <h3>History & Tracking</h3>
          <p>Keep track of all uploads and their print status in one place.</p>
        </div>
      </section>
    </div>
  );
}

export default FeaturePage;
