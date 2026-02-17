import React, { useState } from "react";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can integrate backend API to send message
    console.log("Message sent:", formData);

    // Show popup
    setShowPopup(true);

    // Reset form
    setFormData({ name: "", email: "", message: "" });

    // Hide popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help! Reach out with any questions or concerns.</p>
      </section>

      <section className="contact-info-section">
        <div className="contact-info-card">
          <h3>Email</h3>
          <p>support@printease.com</p>
        </div>
        <div className="contact-info-card">
          <h3>Phone</h3>
          <p>+91 123 456 7890</p>
        </div>
        <div className="contact-info-card">
          <h3>Location</h3>
          <p>NHCE Campus, Bangalore, India</p>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Send a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Popup Message */}
      {showPopup && <div className="popup-message">Your message has been sent!</div>}
    </div>
  );
}

export default ContactPage;
