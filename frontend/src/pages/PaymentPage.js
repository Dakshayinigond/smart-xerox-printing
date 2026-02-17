// frontend/src/pages/PaymentPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    file = null,
    totalAmount: stateTotalAmount,
    deliveryType = "",
    address = "",
    selectedSlot = "",
    notes = "",
  } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState("");
  const [otp, setOtp] = useState(null);
  const [totalAmount, setTotalAmount] = useState(stateTotalAmount || 0);

  const fileName =
    file?.filename || file?.name || file?.file || "Unknown File";

  useEffect(() => {
    if (!stateTotalAmount && file) {
      let filePrice = 0;
      const pricePerPage = file.printColor === "Color" ? 5 : 2;

      const pageCount =
        file.pages === "All Pages"
          ? 10
          : file.pages === "1-5"
          ? 5
          : file.pages === "6-10"
          ? 10
          : file.pages === "11-20"
          ? 20
          : 0;

      filePrice = pricePerPage * pageCount * (file.copies || 1);

      const extrasTotal =
        file.extras?.reduce(
          (sum, item) =>
            sum + (item.price || 0) * (item.quantity || 0),
          0
        ) || 0;

      setTotalAmount(filePrice + extrasTotal);
    }
  }, [file, stateTotalAmount]);

  useEffect(() => {
    if (selectedMethod === "cod") {
      setOtp(Math.floor(1000 + Math.random() * 9000));
    }
  }, [selectedMethod]);

  const handleCOD = () => {
    const orderDetails = {
      file,
      totalAmount,
      deliveryType,
      address,
      selectedSlot,
      notes,
      otp,
      date: new Date().toLocaleString(),
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders));

    navigate("/history");
  };

  const handleOnlinePayment = () => {
    const orderDetails = {
      file,
      totalAmount,
      deliveryType,
      address,
      selectedSlot,
      notes,
      date: new Date().toLocaleString(),
      paymentMethod: "Online Payment",
      paymentStatus: "Paid",
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders));

    navigate("/history");
  };

  if (!file) {
    return <p>⚠️ No file selected. Please upload a file first.</p>;
  }

  return (
    <div className="payment-wrapper">
      <div className="payment-card-container">
        <h2 className="payment-title">💳 Payment Options</h2>

        <div className="payment-details">
          <p><strong>File:</strong> {fileName}</p>
          <p><strong>Delivery:</strong> {deliveryType}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Slot:</strong> {selectedSlot}</p>
          {notes && <p><strong>Notes:</strong> {notes}</p>}
          <p className="total">
            <strong>Total:</strong> ₹{totalAmount}
          </p>
        </div>

        <div className="option-cards">
          <div
            className={`option-card ${
              selectedMethod === "cod" ? "active" : ""
            }`}
            onClick={() => setSelectedMethod("cod")}
          >
            <h3>Cash on Delivery</h3>
            <p>Pay when you receive</p>
          </div>

          <div
            className={`option-card ${
              selectedMethod === "online" ? "active" : ""
            }`}
            onClick={() => setSelectedMethod("online")}
          >
            <h3>Online Payment</h3>
            <p>UPI / Card / NetBanking</p>
          </div>
        </div>

        {selectedMethod === "cod" && (
          <div className="payment-action-box">
            <p className="otp-text">
              OTP: <span className="otp">{otp}</span>
            </p>
            <button className="pay-btn" onClick={handleCOD}>
              Confirm COD ₹{totalAmount}
            </button>
          </div>
        )}

        {selectedMethod === "online" && (
          <div className="payment-action-box">
            <button className="pay-btn" onClick={handleOnlinePayment}>
              Pay Now ₹{totalAmount}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
