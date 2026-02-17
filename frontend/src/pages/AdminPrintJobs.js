import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminPrintJobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, user: "Ravi", file: "notes.pdf", status: "Pending" },
    { id: 2, user: "Anu", file: "project.pdf", status: "Completed" },
  ]);

  const updateStatus = (id, newStatus) => {
    setJobs(
      jobs.map(job =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ padding: "40px", width: "100%" }}>
        <h2>Print Job Management</h2>

        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>User</th>
              <th>PDF File</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.user}</td>
                <td>{job.file}</td>
                <td>{job.status}</td>
                <td>
                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminPrintJobs;
