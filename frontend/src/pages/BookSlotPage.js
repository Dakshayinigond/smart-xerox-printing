import React, { useContext, useState } from "react";
import { UploadContext } from "../context/UploadContext";
import { useNavigate } from "react-router-dom";
import "./BookSlotPage.css";

const BookSlotPage = () => {
  const { currentUpload } = useContext(UploadContext);
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState("");

  if (!currentUpload) {
    return <p>⚠️ Please upload a file first.</p>;
  }

  const handleSelection = () => {
    if (!deliveryType) {
      alert("⚠️ Please select an option!");
      return;
    }

    if (deliveryType === "Collect") {
      navigate("/shop-booking", {
        state: { file: currentUpload, deliveryType },
      });
    } else if (deliveryType === "Home") {
      navigate("/delivery", {
        state: { file: currentUpload, deliveryType },
      });
    }
  };

  return (
    <div className="book-slot-wrapper">
      <div className="book-slot-card">
        <h2 className="book-slot-title">📦 Book Slot</h2>

        <div className="book-slot-details">
          <p>
            <strong>File:</strong> {currentUpload.file}
          </p>
          <p className="total">
            <strong>Total Amount:</strong> ₹{currentUpload.totalAmount}
          </p>
        </div>

        <div className="delivery-options">
          <div
            className={`option-card ${
              deliveryType === "Collect" ? "selected" : ""
            }`}
            onClick={() => setDeliveryType("Collect")}
          >
            <span className="icon">🏬</span>
            <h3>Collect from Shop</h3>
            <p>Pickup your order directly</p>
          </div>

          <div
            className={`option-card ${
              deliveryType === "Home" ? "selected" : ""
            }`}
            onClick={() => setDeliveryType("Home")}
          >
            <span className="icon">🏠</span>
            <h3>Home Delivery</h3>
            <p>Get your order delivered</p>
          </div>
        </div>

        <button className="confirm-btn" onClick={handleSelection}>
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default BookSlotPage;
