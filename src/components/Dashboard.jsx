// src/components/Dashboard.jsx
import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        background: "linear-gradient(to right, #1976d2, #2196f3)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        /* ⭐ FIXED PART BELOW ⭐ */
        padding: "0 15px",            // Reduced padding so button fits
        boxSizing: "border-box",      // Prevents content overflow
        overflowX: "hidden",          // Removes horizontal scroll
        maxWidth: "100%",             // Never exceed screen width
        /* ⭐ END FIX ⭐ */

        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: "sans-serif",
      }}
    >
      {/* LEFT SIDE TEXT */}
      <h3
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: "600",
          whiteSpace: "nowrap",
        }}
      >
        Welcome, {user.name || user.username} 👋
      </h3>

      {/* RIGHT SIDE LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#ff3f6c",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",

          /* Ensures button stays fully visible */
          whiteSpace: "nowrap",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
