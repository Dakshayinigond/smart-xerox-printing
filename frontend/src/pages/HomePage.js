import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import ChatBox from "../components/ChatBox";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-inner">

          {/* LEFT IMAGE */}
          <div className="hero-image">
            <img src="/img2.jpg" alt="Smart Printing" />
            
          </div>

          {/* RIGHT CONTENT */}
          <div className="hero-content">
            <h1>
              Simplify Your <span>College Printing</span> Experience
            </h1>
            <h3>
              Upload, Print & Collect – hassle-free service exclusively for students
            </h3>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/login")}
              >
                Get Started →
              </button>

              <button
                className="btn-secondary"
                onClick={() => navigate("/feature")}
              >
                Learn More
              </button>
            </div>
          </div>

        </div>
      </section>

    

      {/* HOW IT WORKS */}
      <section className="timeline">
        <h2>How It Works</h2>

        <div className="timeline-container-row">
          <div className="timeline-item">
            <div className="timeline-icon">1</div>
            <h4>Upload</h4>
            <p>Select your document and upload securely.</p>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon">2</div>
            <h4>Customize</h4>
            <p>Choose print type, pages, and format.</p>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon">3</div>
            <h4>Collect</h4>
            <p>Pick up your prints at your reserved slot.</p>
          </div>
        </div>
      </section>

      {/* STUDENT STORIES */}
      <section className="student-stories">
        <h2>Student Success Stories</h2>

        <div className="stories-container">
          <div className="story-card">
            <h4>Priya S.</h4>
            <p><strong>Task:</strong> Printed semester notes online</p>
            <p><strong>Result:</strong> Saved 2 hours daily</p>
            <div className="rating">★★★★☆</div>
          </div>

          <div className="story-card">
            <h4>Rahul K.</h4>
            <p><strong>Task:</strong> Customized print for assignments</p>
            <p><strong>Result:</strong> Hassle-free submission</p>
            <div className="rating">★★★★★</div>
          </div>

          <div className="story-card">
            <h4>Ananya P.</h4>
            <p><strong>Task:</strong> Printed group project sheets</p>
            <p><strong>Result:</strong> Smooth collaboration</p>
            <div className="rating">★★★★☆</div>
          </div>
        </div>
      </section>

      {/* CHAT */}
      <ChatBox />
    </div>
  );
}

export default HomePage;
