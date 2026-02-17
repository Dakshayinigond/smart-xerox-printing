// frontend/src/pages/OnlinePaymentPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OnlinePaymentPage.css";

const OnlinePaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { file, totalAmount, selectedSlot, notes } = location.state || {};

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
    upiId: "",
    method: "card",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePayment = () => {
    const orderDetails = {
      file,
      totalAmount,
      selectedSlot,
      notes,
      date: new Date().toLocaleString(),
      paymentMethod: "Paid Online",
      paymentStatus: "Paid",
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders));

    navigate("/payment-success", { state: { orderDetails } });
  };

  if (!file) {
    return <p>⚠️ No file selected. Please upload a file first.</p>;
  }

  return (
    <div className="online-payment-wrapper">
      <div className="online-payment-card">
        <h2 className="online-title">💳 Online Payment</h2>

        <div className="online-details">
          <p><strong>File:</strong> {file.filename}</p>
          <p><strong>Slot:</strong> {selectedSlot}</p>
          {notes && <p><strong>Notes:</strong> {notes}</p>}
          <p className="total">
            <strong>Total:</strong> ₹{totalAmount}
          </p>
        </div>

        <div className="payment-method-toggle">
          <button
            className={paymentInfo.method === "card" ? "active" : ""}
            onClick={() =>
              setPaymentInfo({ ...paymentInfo, method: "card" })
            }
          >
            Card
          </button>
          <button
            className={paymentInfo.method === "upi" ? "active" : ""}
            onClick={() =>
              setPaymentInfo({ ...paymentInfo, method: "upi" })
            }
          >
            UPI
          </button>
        </div>

        {paymentInfo.method === "card" && (
          <div className="payment-form">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
            />
            <div className="row">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={paymentInfo.expiry}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              name="cardHolder"
              placeholder="Cardholder Name"
              value={paymentInfo.cardHolder}
              onChange={handleInputChange}
            />
          </div>
        )}

        {paymentInfo.method === "upi" && (
          <div className="payment-form">
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID"
              value={paymentInfo.upiId}
              onChange={handleInputChange}
            />
          </div>
        )}

        <button className="pay-now-btn" onClick={handlePayment}>
          Pay ₹{totalAmount}
        </button>
      </div>
    </div>
  );
};

export default OnlinePaymentPage;
