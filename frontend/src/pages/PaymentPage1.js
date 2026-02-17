// frontend/src/pages/PaymentPage1.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage1.css";

const PaymentPage1 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    file = null,
    totalAmount = 0,
    deliveryType = "",
    selectedSlot = "",
    notes = "",
  } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState("");
  const [otp, setOtp] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (selectedMethod === "shop") {
      setOtp(Math.floor(100000 + Math.random() * 900000));
    }
  }, [selectedMethod]);

  const handlePayAtShop = () => {
    const orderDetails = {
      file,
      totalAmount,
      deliveryType,
      selectedSlot,
      notes,
      otp,
      date: new Date().toLocaleString(),
      paymentMethod: "Pay at Shop",
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders));

    setSuccessMsg(
      `✅ Slot booked successfully! Amount ₹${totalAmount} to be paid at shop.`
    );

    setTimeout(() => navigate("/history"), 3000);
  };

  const handleOnlinePayment = () => {
    navigate("/online-payment", {
      state: { file, totalAmount, deliveryType, selectedSlot, notes },
    });
  };

  if (!file) {
    return <p>⚠️ No file selected. Please upload a file first.</p>;
  }

  return (
    <div className="payment1-wrapper">
      <div className="payment1-card">
        <h2 className="payment1-title">💳 Payment Options</h2>

        <div className="payment1-details">
          <p><strong>File:</strong> {file.file || file.name || "Your File"}</p>
          <p><strong>Slot:</strong> {selectedSlot}</p>
          {notes && <p><strong>Notes:</strong> {notes}</p>}
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        </div>

        <div className="option-cards">
          <div
            className={`option-card ${selectedMethod === "shop" ? "active" : ""}`}
            onClick={() => {
              setSelectedMethod("shop");
              setSuccessMsg("");
            }}
          >
            <h3>Pay at Shop</h3>
            <p>Pay when you collect</p>
          </div>

          <div
            className={`option-card ${selectedMethod === "online" ? "active" : ""}`}
            onClick={() => {
              setSelectedMethod("online");
              setSuccessMsg("");
            }}
          >
            <h3>Pay Online</h3>
            <p>UPI / Card / NetBanking</p>
          </div>
        </div>

        {selectedMethod === "shop" && !successMsg && (
          <div className="payment-action-box">
            <p className="otp-text">
              OTP: <span className="otp">{otp}</span>
            </p>
            <button className="pay-btn" onClick={handlePayAtShop}>
              Pay at Shop ₹{totalAmount}
            </button>
          </div>
        )}

        {selectedMethod === "online" && !successMsg && (
          <div className="payment-action-box">
            <button className="pay-btn" onClick={handleOnlinePayment}>
              Pay Online ₹{totalAmount}
            </button>
          </div>
        )}

        {successMsg && (
          <div className="success-box">
            <p>{successMsg}</p>
            <span>Redirecting to history...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage1;
