// frontend/src/pages/PrintRequests.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PrintRequests.css";

const PrintRequests = () => {
  const [printRequests, setPrintRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrintRequests = async () => {
      try {
        // Make sure your backend route is correct
        const response = await axios.get("http://localhost:5000/api/admin/print-requests");
        setPrintRequests(response.data.requests || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching print requests:", error);
        setLoading(false);
      }
    };

    fetchPrintRequests();
  }, []);

  if (loading) {
    return <p>Loading print requests...</p>;
  }

  if (printRequests.length === 0) {
    return <p>No print requests found.</p>;
  }

  return (
    <div className="print-requests-wrapper">
      <h2>📄 Print Requests</h2>
      <table className="print-requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>OTP</th>
          </tr>
        </thead>
        <tbody>
          {printRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.user_name}</td>
              <td>₹{request.amount}</td>
              <td>{request.status}</td>
              <td>{new Date(request.created_at).toLocaleString()}</td>
              <td>{request.otp || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintRequests;
