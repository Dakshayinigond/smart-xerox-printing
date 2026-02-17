import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminUsersPage.css";

const AdminUsersPage = () => {
  const [orders, setOrders] = useState([]);
  const [enteredOtp, setEnteredOtp] = useState({});

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
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

  const handleOtpChange = (idx, value) => {
    setEnteredOtp((prev) => ({ ...prev, [idx]: value }));
  };

  const verifyOtp = (idx) => {
    const updatedOrders = [...orders];

    // convert both to string to avoid number/string mismatch
    if (
      String(enteredOtp[idx]) ===
      String(updatedOrders[idx].otp)
    ) {
      updatedOrders[idx].completed = true;

      alert("✅ OTP Verified Successfully!");

      // save updated status
      localStorage.setItem(
        "orders",
        JSON.stringify(updatedOrders)
      );

      setOrders(updatedOrders);
      setEnteredOtp((prev) => ({ ...prev, [idx]: "" }));
    } else {
      alert("❌ Incorrect OTP! Please try again.");
    }
  };

  return (
    <div className="admin-users-wrapper">
      <AdminSidebar />

      <div className="admin-users-content">
        <h2>Admin – Order History</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>OTP</th>
                <th>Verify</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx}>
                  <td>{getFileName(order)}</td>

                  <td>
                    {order.completed ? (
                      "-"
                    ) : (
                      <input
                        type="text"
                        value={enteredOtp[idx] || ""}
                        onChange={(e) =>
                          handleOtpChange(idx, e.target.value)
                        }
                        placeholder="Enter OTP"
                      />
                    )}
                  </td>

                  <td>
                    {!order.completed && (
                      <button onClick={() => verifyOtp(idx)}>
                        Verify OTP
                      </button>
                    )}
                  </td>

                  <td>
                    {order.completed
                      ? "Completed ✔"
                      : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
