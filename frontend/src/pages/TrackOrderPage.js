// frontend/src/pages/TrackOrderPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TrackOrderPage.css";

const TrackOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);

  // Example order statuses
  const statusSteps = ["Order Placed", "Processing", "Ready for Pickup", "Completed"];

  useEffect(() => {
    if (!orderDetails || !orderDetails.id) return;

    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/track/${orderDetails.id}`);
        const data = await response.json();
        if (response.ok) {
          setCurrentStep(data.step);
        } else {
          console.error("Error fetching status:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    // Fetch immediately
    fetchStatus();

    // Poll every 10 seconds for real-time updates
    const interval = setInterval(fetchStatus, 10000);

    return () => clearInterval(interval);
  }, [orderDetails?.id]);

  if (!orderDetails || !orderDetails.id) {
    return (
      <div className="track-wrapper">
        <h2>No order found!</h2>
        <button onClick={() => navigate("/history")}>Go to History</button>
      </div>
    );
  }

  return (
    <div className="track-wrapper">
      <h2>Track Your Order</h2>
      <p>Booking for: <strong>{orderDetails.file.filename}</strong></p>
      <p>Slot: <strong>{orderDetails.selectedSlot}</strong></p>

      <div className="track-status">
        {statusSteps.map((step, index) => (
          <div key={index} className={`step ${index <= currentStep ? "active" : ""}`}>
            <div className="circle">{index + 1}</div>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/history")} className="go-history-btn">
        Go to History
      </button>
    </div>
  );
};

export default TrackOrderPage;
