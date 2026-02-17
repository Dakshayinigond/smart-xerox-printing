// frontend/src/pages/DeliveryBookingPage.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import "./DeliveryBookingPage.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LocationMarker = ({ location, setLocation, setAddress }) => {
  useMapEvents({
    click: async (e) => {
      const latlng = e.latlng;
      setLocation(latlng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`
        );
        const data = await res.json();
        if (data.display_name) setAddress(data.display_name);
      } catch {
        toast.error("⚠️ Failed to fetch address from location.");
      }
    },
  });

  return location ? <Marker position={location} draggable={true} /> : null;
};

const DeliveryBookingPage = () => {
  const locationState = useLocation().state;
  const file = locationState?.file;
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [locationMarker, setLocationMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!file) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocationMarker(loc);
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.lat}&lon=${loc.lng}`
            );
            const data = await res.json();
            if (data.display_name) setAddress(data.display_name);
          } catch {}
        },
        () => toast.error("⚠️ Please allow location access for delivery.")
      );
    }
  }, [file]);

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const loc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        setLocationMarker(loc);
        setAddress(data[0].display_name);
      } else toast.error("⚠️ Location not found!");
    } catch {
      toast.error("⚠️ Search failed!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !locationMarker) {
      toast.error("⚠️ Please select a valid address on the map!");
      return;
    }

    navigate("/payment", {
      state: {
        file,
        totalAmount: file.price,
        deliveryType: "Home Delivery",
        address,
        selectedSlot: locationState?.selectedSlot || "Any",
        notes,
      },
    });
  };

  if (!file) return <p>⚠️ Please upload a file first.</p>;

  return (
    <div className="delivery-container">
      <h2>📍 Select Delivery Location</h2>
      <p>Click on the map or search to choose your delivery address.</p>

      <form className="delivery-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Search Address</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Type location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Delivery Address *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Additional Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Confirm & Proceed to Payment
        </button>
      </form>

      <div className="map-wrapper" style={{ marginTop: "20px" }}>
        <MapContainer
          center={locationMarker || { lat: 12.9716, lng: 77.5946 }}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <LocationMarker
            location={locationMarker}
            setLocation={setLocationMarker}
            setAddress={setAddress}
          />
        </MapContainer>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default DeliveryBookingPage;
