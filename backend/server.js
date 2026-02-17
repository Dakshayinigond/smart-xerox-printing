// ---------------- Dependencies ----------------
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ---------------- App Initialization ----------------
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// ---------------- PostgreSQL Connection ----------------
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smart_users",
  password: "postgres",
  port: 5432,
});

// ---------------- Test Route ----------------
app.get("/", (req, res) => res.send("🚀 Smart Printing Server is running successfully!"));

// ---------------- User Registration ----------------
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // 1️⃣ Check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email, and password are required" });
  }

  try {
    // 2️⃣ Check if email already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // 3️⃣ Hash password and insert user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [name, email, hashedPassword]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ---------------- User Login ----------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0)
      return res.status(400).json({ success: false, message: "User not found" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ success: false, message: "Invalid password" });

    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// ---------------- Slot Booking ----------------
app.post("/book-slot", async (req, res) => {
  const { userId, date, time, usn, phone, notes, pages, sides, paperType, amount } = req.body;

  if (!date || !time || !usn || !phone || !pages || !sides || !paperType || !amount) {
    return res.json({ success: false, message: "Missing booking details" });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const result = await pool.query(
      `INSERT INTO bookings 
        (user_id, date, time, usn, phone, notes, pages, sides, paper_type, amount, otp, status, created_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'Pending Payment', NOW())
        RETURNING *`,
      [userId || null, date, time, usn, phone, notes, pages, sides, paperType, amount, otp]
    );

    res.json({
      success: true,
      message: "Slot booked successfully",
      otp: result.rows[0].otp,
    });
  } catch (err) {
    console.error("❌ Booking error:", err.message);
    res.status(500).json({ success: false, message: "Booking failed" });
  }
});

// ---------------- Get User Booking History ----------------
app.get("/bookings/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE user_id=$1 ORDER BY date DESC, time DESC",
      [userId]
    );
    res.json({ success: true, bookings: result.rows });
  } catch (err) {
    console.error("❌ Fetch bookings error:", err.message);
    res.status(500).json({ success: false, message: "Could not fetch bookings" });
  }
});

// ---------------- File Upload Setup ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ---------------- Upload File ----------------
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { userId, printColor, sides, copies, pages, comments, amount } = req.body;

    if (!req.file)
      return res.status(400).json({ success: false, message: "File is required" });

    const fileName = req.file.filename;
    const documentName = req.file.originalname;

    const result = await pool.query(
      `INSERT INTO print_jobs
      (user_id, file_name, document_name, status, print_color, sides, copies, pages, comments, amount, created_at)
      VALUES ($1,$2,$3,'Pending',$4,$5,$6,$7,$8,$9,NOW()) RETURNING *`,
      [userId, fileName, documentName, printColor, sides, copies, pages, comments, amount]
    );

    res.json({ success: true, job: result.rows[0] });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// ---------------- Admin Routes ----------------

// Get all users
app.get("/api/admin/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, created_at FROM users ORDER BY created_at DESC");
    res.json({ success: true, users: result.rows });
  } catch (err) {
    console.error("❌ Fetch users error:", err);
    res.status(500).json({ success: false, users: [] });
  }
});

// Get all print requests
app.get("/api/admin/print-requests", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT pj.id, pj.amount, pj.status, pj.created_at, pj.otp, u.name AS user_name
      FROM print_jobs pj
      LEFT JOIN users u ON pj.user_id = u.id
      ORDER BY pj.created_at DESC
    `);
    res.json({ success: true, requests: result.rows });
  } catch (err) {
    console.error("❌ Fetch print requests error:", err);
    res.status(500).json({ success: false, requests: [] });
  }
});

// ---------------- Start Server ----------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Smart Printing Server running at http://localhost:${PORT}`)
);
