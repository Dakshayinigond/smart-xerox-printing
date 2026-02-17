// backend/routes/slotBookingRoutes.js
import express from "express";
import pkg from "pg";

const { Pool } = pkg;
const router = express.Router();

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smart_users",
  password: "postgres",
  port: 5432,
});

// Get all bookings (history)
router.get("/slot-bookings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM slot_bookings ORDER BY date DESC, time DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
