// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { UploadProvider } from "./context/UploadContext";

// ---------------- User Pages ----------------
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UploadForm from "./pages/UploadForm";
import ChooseModePage from "./pages/ChooseModePage";
import BookSlotPage from "./pages/BookSlotPage";
import DeliveryBookingPage from "./pages/DeliveryBookingPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentPage1 from "./pages/PaymentPage1";
import HistoryPage from "./pages/HistoryPage";
import FeaturePage from "./pages/FeaturePage";
import ContactPage from "./pages/ContactPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import OnlinePaymentPage from "./pages/OnlinePaymentPage";

// ---------------- Admin Pages ----------------
import AdminDashboard from "./pages/AdminDashboardWithHistory";
import SlotBookings from "./pages/SlotBookings";
import PrintRequests from "./pages/PrintRequests";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

// ---------------- Components ----------------
import NavbarHome from "./components/NavbarHome";
import NavbarUpload from "./components/NavbarUpload";
import ShopBookingForm from "./components/ShopBookingForm";

// ---------------- Not Found ----------------
import NotFoundPage from "./pages/NotFoundPage";
import AdminUsersPage from "./pages/AdminUsersPage";

function App() {
  return (
    <UploadProvider>
      <Router>
        <Routes>
          {/* ---------------- Public/User Routes ---------------- */}
          <Route path="/" element={<><NavbarHome /><HomePage /></>} />
          <Route path="/feature" element={<><NavbarHome /><FeaturePage /></>} />
          <Route path="/contact" element={<><NavbarHome /><ContactPage /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/upload" element={<><NavbarUpload /><UploadForm /></>} />
          <Route path="/choose-mode" element={<><NavbarUpload /><ChooseModePage /></>} />
          <Route path="/book-slot" element={<><NavbarUpload /><BookSlotPage /></>} />
          <Route path="/delivery" element={<><NavbarUpload /><DeliveryBookingPage /></>} />
          <Route path="/payment" element={<><NavbarUpload /><PaymentPage /></>} />
          <Route path="/payment-shop" element={<PaymentPage1 />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/history" element={<><NavbarUpload /><HistoryPage /></>} />
          <Route path="/shop-booking" element={<><NavbarUpload /><ShopBookingForm /></>} />
          <Route path="/online-payment" element={<><NavbarUpload /><OnlinePaymentPage /></>} />

          {/* ---------------- Admin Routes ---------------- */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/slot-bookings" element={<HistoryPage />} />
          <Route path="/admin/print-requests" element={<PrintRequests />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/settings" element={<Settings />} />

          {/* ---------------- Catch-all 404 ---------------- */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UploadProvider>
  );
}

export default App;
