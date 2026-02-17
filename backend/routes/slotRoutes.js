const express = require("express");
const router = express.Router();

// Already booked slots
let bookedSlots = {
  shop: [],
  delivery: []
};

// Configurable available slots
const allSlots = {
  shop: [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ],
  delivery: [
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM"
  ]
};

// Get available slots
router.get("/slots/:type", (req, res) => {
  const type = req.params.type; // shop or delivery

  if (!allSlots[type]) {
    return res.status(400).json({ success: false, message: "Invalid type" });
  }

  // Filter out booked slots
  const available = allSlots[type].filter(slot => !bookedSlots[type].includes(slot));
  res.json({ success: true, availableSlots: available });
});

// Book a slot
router.post("/book", (req, res) => {
  const { type, slot } = req.body;

  if (!allSlots[type]) {
    return res.status(400).json({ success: false, message: "Invalid type" });
  }

  if (!slot || !allSlots[type].includes(slot)) {
    return res.status(400).json({ success: false, message: "Invalid slot" });
  }

  if (bookedSlots[type].includes(slot)) {
    return res.status(400).json({ success: false, message: "Slot already booked" });
  }

  bookedSlots[type].push(slot);
  res.json({ success: true, message: `${type} slot booked successfully`, slot });
});

module.exports = router;
