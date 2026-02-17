import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UploadContext } from "../context/UploadContext";
import "./UploadForm.css";

const UploadForm = () => {
  const { user, addUpload } = useContext(UploadContext);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [pages, setPages] = useState("");
  const [copies, setCopies] = useState(1);
  const [printColor, setPrintColor] = useState("");
  const [notes, setNotes] = useState("");
  const [notification, setNotification] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [deliveryType, setDeliveryType] = useState("Home Delivery");

  const [extras, setExtras] = useState([
    { name: "Binding", price: 5, quantity: 0 },
    { name: "Spiral Binding", price: 15, quantity: 0 },
    { name: "Lamination", price: 20, quantity: 0 },
    { name: "Glossy Paper", price: 10, quantity: 0 },
    { name: "A4 Sheets", price: 1, quantity: 0 },
    { name: "Pen", price: 10, quantity: 0 },
    { name: "Notebook", price: 30, quantity: 0 },
    { name: "Sticky Notes", price: 25, quantity: 0 },
    { name: "Stapler Pins", price: 5, quantity: 0 },
    { name: "Folder", price: 15, quantity: 0 },
    { name: "Pen Drive", price: 300, quantity: 0 },
  ]);

  // 📂 File Upload Handlers
  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => e.preventDefault();

  // ➕ Update Extras Quantity
  const handleExtraChange = (index, value) => {
    const updated = [...extras];
    updated[index].quantity = parseInt(value) || 0;
    setExtras(updated);
  };

  // 💰 Calculate Total Price
  const calculatePrice = () => {
    if (!file || !pages || !copies || !printColor) return 0;

    const pricePerPage = printColor === "Color" ? 5 : 2;
    const pageCount =
      pages === "All Pages"
        ? 10
        : pages === "1-5"
        ? 5
        : pages === "6-10"
        ? 10
        : pages === "11-20"
        ? 20
        : 0;

    const filePrice = pricePerPage * pageCount * copies;
    const extrasTotal = extras.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return filePrice + extrasTotal;
  };

  // 🧾 Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !pages || !copies || !printColor) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    const price = calculatePrice();
    const otp = Math.floor(1000 + Math.random() * 9000); // random OTP
    const bookingId = `BK${Date.now()}`;

    const selectedItems = extras.filter((e) => e.quantity > 0);

    // ✅ Full Order Data (includes selected items)
    const newOrder = {
      id: bookingId,
      file: file.name,
      totalAmount: price,
      paymentMethod,
      deliveryType,
      otp,
      date: new Date().toLocaleString(),
      items: selectedItems,
      pages,
      copies,
      printColor,
      notes,
      status: "Pending",
    };

    // 💾 Save to Upload Context
    addUpload(newOrder);

    // 💾 Save to LocalStorage (for history page)
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // ✅ Show success and redirect
    setNotification(`✅ ${file.name} uploaded successfully! Total ₹${price}`);

    setTimeout(() => {
      navigate("/book-slot", { state: { totalAmount: price, bookingId } });
    }, 1500);
  };

  if (!user)
    return <p className="login-warning">⚠️ Please login to upload files.</p>;

  return (
    <div className="upload-wrapper">
      <h2 className="upload-title-adv">📄 Smart Printing Upload</h2>
      {notification && <div className="upload-notification">{notification}</div>}

      <div className="upload-layout">
        {/* LEFT SIDE FORM */}
        <div className="upload-left">
          <div
            className={`drop-zone-adv ${file ? "has-file" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {!file ? (
              <p>Drag & Drop your file here or click to browse</p>
            ) : (
              <p>
                {file.name}{" "}
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => setFile(null)}
                >
                  ✖
                </button>
              </p>
            )}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <form className="upload-form-adv" onSubmit={handleSubmit}>
            <div className="form-grid-adv">
              <div className="input-card">
                <label>Pages *</label>
                <select
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                >
                  <option value="">Select Pages</option>
                  <option value="All Pages">All Pages</option>
                  <option value="1-5">1-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-20">11-20</option>
                </select>
              </div>

              <div className="input-card">
                <label>Copies *</label>
                <input
                  type="number"
                  min="1"
                  value={copies}
                  onChange={(e) => setCopies(e.target.value)}
                />
              </div>

              <div className="input-card">
                <label>Print Color *</label>
                <select
                  value={printColor}
                  onChange={(e) => setPrintColor(e.target.value)}
                >
                  <option value="">Select Color</option>
                  <option value="Color">Color</option>
                  <option value="Black & White">Black & White</option>
                </select>
              </div>
            </div>

           

            <div className="notes-section">
              <label>Notes / Instructions</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Double-sided, staple top-left..."
              />
            </div>

            <div className="summary-card">
              <h3>💰 Total: ₹{calculatePrice()}</h3>
              <p>{file ? `File: ${file.name}` : "No file selected"}</p>
            </div>

            <button type="submit" className="upload-btn-adv">
              🚀 Upload & Book Slot
            </button>
          </form>
        </div>

        {/* RIGHT SIDE EXTRAS */}
        <div className="upload-right">
          <div className="extras-section-adv sticky">
            <h3>🛍️ Extras / Stationery</h3>
            <div className="extras-grid">
              {extras.map((item, idx) => (
                <div key={idx} className="extras-card">
                  <div className="extras-info">
                    <span>{item.name}</span>
                    <p>₹{item.price}</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => handleExtraChange(idx, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
