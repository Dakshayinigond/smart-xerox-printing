import React, { useEffect, useState } from "react";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders.reverse());
  }, []);

  const getFileName = (order) => {
    return (
      (order.file &&
        (order.file.filename ||
          order.file.name ||
          order.file.file)) ||
      order.file ||
      order.fileName ||
      "Unknown File"
    );
  };

  return (
    <div className="history-wrapper">
      <h2 className="history-title">📝 Order History</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        <div className="history-list">
          {orders.map((order, idx) => (
            <div className="history-row-card" key={idx}>
              <div className="row-left">
                <div className="pdf-icon">📄</div>
              </div>

              <div className="row-middle">
                <h3 className="file-name">
                  {getFileName(order)}
                </h3>

                <p>
                  <strong>OTP:</strong>{" "}
                  {order.otp ? order.otp : "—"}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {order.date || "N/A"}
                </p>
              </div>

              <div className="row-right">
                <span
                  className={`status-badge ${
                    order.completed ? "completed" : "pending"
                  }`}
                >
                  {order.completed ? "Completed ✔" : "Pending ⏳"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
