// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Your PostgreSQL pool connection

// ---------------- Users ----------------
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email FROM users ORDER BY id DESC");
    res.json({ success: true, users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, users: [] });
  }
});

// ---------------- Print Requests ----------------
router.get("/print-requests", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT pj.id, pj.document_name, pj.status, pj.amount, pj.created_at, pj.otp, u.name AS user_name
      FROM print_jobs pj
      LEFT JOIN users u ON pj.user_id = u.id
      ORDER BY pj.created_at DESC
    `);
    res.json({ success: true, requests: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, requests: [] });
  }
});

module.exports = router;
