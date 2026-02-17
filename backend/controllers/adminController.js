// Admin Controller
exports.getDashboardStats = async (req, res) => {
  const pool = req.app.get("pool");

  try {
    const totalUsers = await pool.query("SELECT COUNT(*) AS count FROM users");
    const pendingRequests = await pool.query(
      "SELECT COUNT(*) AS count FROM print_jobs WHERE status='Pending'"
    );
    const completedPrints = await pool.query(
      "SELECT COUNT(*) AS count FROM print_jobs WHERE status='Completed'"
    );
    const todaysBookings = await pool.query(
      "SELECT COUNT(*) AS count FROM bookings WHERE DATE(created_at) = CURRENT_DATE"
    );

    res.json({
      totalUsers: parseInt(totalUsers.rows[0].count),
      pendingRequests: parseInt(pendingRequests.rows[0].count),
      completedPrints: parseInt(completedPrints.rows[0].count),
      todaysBookings: parseInt(todaysBookings.rows[0].count),
    });
  } catch (err) {
    console.error("❌ Dashboard stats error:", err.message);
    res.status(500).json({ success: false, message: "Could not fetch dashboard stats" });
  }
};
