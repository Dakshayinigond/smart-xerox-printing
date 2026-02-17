// db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",          // your PostgreSQL username
  host: "localhost",
  database: "smart_users",   // ✅ your actual database name
  password: "postgres", // 🔒 replace with your real PostgreSQL password
  port: 5432,
});

export default pool;
