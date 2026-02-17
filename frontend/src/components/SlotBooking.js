// frontend/src/components/SlotBooking.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const SlotBooking = ({ type, onSlotSelect }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, [type]);

  const fetchSlots = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/slots/${type}`);
      if (res.data.success) {
        setSlots(res.data.availableSlots);
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  return (
    <div className="form-group">
      <label>Select {type === "shop" ? "Pickup" : "Delivery"} Slot *</label>
      <select onChange={(e) => onSlotSelect(e.target.value)}>
        <option value="">-- Select Slot --</option>
        {slots.map((slot, index) => (
          <option key={index} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SlotBooking;
