import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UploadContext } from "../context/UploadContext";
import "./ChooseModePage.css"; // We'll style here

const ChooseModePage = () => {
  const navigate = useNavigate();
  const { currentUpload } = useContext(UploadContext);

  if (!currentUpload) return <p className="upload-warning">⚠️ Please upload a file first!</p>;

  const handleSelect = (type) => {
    if (type === "collect") navigate("/shop-booking");
    else if (type === "delivery") navigate("/delivery");
  };

  return (
    <div className="choose-mode-container">
      <h1>🚀 Choose Your Delivery Option</h1>
      <p className="subtitle">For file: <strong>{currentUpload.filename}</strong> (₹{currentUpload.price})</p>

      <div className="mode-cards">
        <div
          className="mode-card collect"
          onClick={() => handleSelect("collect")}
        >
          <div className="icon">🏬</div>
          <h2>Collect from Shop</h2>
          <p>Pick up your print from our store at your preferred time slot.</p>
        </div>

        <div
          className="mode-card delivery"
          onClick={() => handleSelect("delivery")}
        >
          <div className="icon">🏠</div>
          <h2>Home Delivery</h2>
          <p>Get your print delivered to your doorstep with real-time tracking.</p>
        </div>
      </div>
    </div>
  );
};

export default ChooseModePage;
