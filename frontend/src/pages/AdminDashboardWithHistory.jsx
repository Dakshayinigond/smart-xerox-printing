import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminCard from "../components/AdminCard";
import "./AdminDashboardWithHistory.css"; // Import CSS

const AdminDashboardWithHistory = () => {
  const dashboardData = {
    totalPdfs: 21,
    pendingJobs: 18,
    completedJobs: 3,
    totalUsers: 11,
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders.reverse()); // latest first
  }, []);

  // Number of first orders to hide
  const hideFirstN = 2;

  return (
    <div className="admin-dashboard-wrapper">
      <AdminSidebar />

      <div className="admin-dashboard-content">
        <h2>Admin Dashboard</h2>

        <div className="dashboard-cards">
          <AdminCard title="Total PDFs" value={dashboardData.totalPdfs} />
          <AdminCard title="Pending Jobs" value={dashboardData.pendingJobs} />
          <AdminCard title="Completed Jobs" value={dashboardData.completedJobs} />
          <AdminCard title="Total Users" value={dashboardData.totalUsers} />
        </div>

        <h3 className="history-title">📄 Job / Upload History</h3>

        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Total Amount (₹)</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Delivery Type</th>
                <th>Slot / Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {orders.length <= hideFirstN ? (
                <tr>
                  <td colSpan="7" className="no-orders">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.slice(20 ).map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.file?.filename || order.file?.name}</td>
                    <td>{order.totalAmount}</td>
                    <td>{order.paymentMethod || "-"}</td>
                    <td>{order.paymentStatus || "-"}</td>
                    <td>{order.deliveryType || "-"}</td>
                    <td>{order.selectedSlot || order.date}</td>
                    <td>{order.notes || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithHistory;
