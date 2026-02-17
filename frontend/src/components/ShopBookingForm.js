import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ShopBookingForm.css";

const ShopBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, deliveryType } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBookSlot = () => {
    const { name, contact, date, time } = formData;

    if (!name || !contact || !date || !time) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    navigate("/payment-shop", {
      state: {
        file,
        totalAmount: file.price,
        deliveryType,
        formData,
        otp,
      },
    });
  };

  if (!file) return <p className="warning">⚠️ No file selected.</p>;

  return (
    <div className="shop-booking-wrapper">
      <div className="shop-booking-card">
        <h2 className="shop-booking-title">🗓 Book Your Slot</h2>

        <div className="shop-booking-details">
          <p>
            <strong>File:</strong> {file.filename}
          </p>
          <p className="total">
            <strong>Total Amount:</strong> ₹{file.price}
          </p>
        </div>

        <div className="slot-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
          />

          <div className="row">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <button className="book-slot-btn" onClick={handleBookSlot}>
            Book Slot & Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopBookingForm;
