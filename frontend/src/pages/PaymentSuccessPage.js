// frontend/src/pages/PaymentSuccessPage.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};

  // Auto redirect to history
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/history");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!orderDetails) {
    return (
      <div className="payment-success-wrapper">
        <div className="payment-success-card">
          <h2>No order details found!</h2>
          <button
            className="go-history-btn"
            onClick={() => navigate("/history")}
          >
            Go to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-wrapper">
      <div className="payment-success-card">
        <div className="success-icon">
          <div className="checkmark"></div>
        </div>

        <h2 className="success-title">Payment Successful</h2>

        <div className="success-details">
          <p><strong>File:</strong> {orderDetails.file.filename}</p>
          <p><strong>Slot:</strong> {orderDetails.selectedSlot}</p>
          <p><strong>Total Paid:</strong> ₹{orderDetails.totalAmount}</p>
          <p><strong>Payment:</strong> {orderDetails.paymentMethod}</p>
          <p><strong>Date:</strong> {orderDetails.date}</p>
        </div>

        <button
          className="go-history-btn"
          onClick={() => navigate("/history")}
        >
          Go to History
        </button>

        <p className="redirect-text">
          Redirecting to history page...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
