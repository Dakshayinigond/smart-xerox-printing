import React, { useEffect, useState } from "react";
import "./SlotBookings.css";

const SlotBookings = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/slot-bookings")
      .then(res => res.json())
      .then(data => {
        if (data.success) setUploads(data.uploads);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  if (uploads.length === 0) {
    return <p className="no-uploads">No uploads found.</p>;
  }

  return (
    <div className="slot-wrapper">
      <h2 className="slot-title">📁 All Uploaded Files / Slot Bookings</h2>
      <div className="slot-list">
        {uploads.map((upload, idx) => (
          <div key={idx} className="slot-card">
            <div className="slot-header">
              <span className="file-name">{upload.document_name}</span>
              <span className={`badge ${upload.status === "Pending" ? "pending" : "completed"}`}>
                {upload.status}
              </span>
            </div>

            <div className="slot-details">
              <p><strong>User:</strong> {upload.user_name || "N/A"} ({upload.user_email || "N/A"})</p>
              <p><strong>Print Color:</strong> {upload.print_color}</p>
              <p><strong>Sides:</strong> {upload.sides}</p>
              <p><strong>Copies:</strong> {upload.copies}</p>
              <p><strong>Pages:</strong> {upload.pages}</p>
              <p><strong>Comments:</strong> {upload.comments || "-"}</p>
              {upload.booking_status && <p><strong>Booking Status:</strong> {upload.booking_status}</p>}
              <p>
                <strong>File Link:</strong>{" "}
                <a href={`http://localhost:5000/uploads/${upload.file_name}`} target="_blank" rel="noreferrer">
                  {upload.file_name}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotBookings;
