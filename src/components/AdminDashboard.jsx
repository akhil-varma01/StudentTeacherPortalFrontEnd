// src/components/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Admin not logged in</h2>
        <button onClick={() => navigate("/")} style={{ marginTop: 12 }}>Go to Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom,#b3f2d0,#8bddb9,#6ac8a3)", padding: 20, fontFamily: "Poppins, sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: "#003d27" }}>Admin Dashboard</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("/admin/tasks")} style={{ padding: "8px 12px", borderRadius: 8, background: "#2e7d62", color: "white", border: "none" }}>
              Manage Tasks
            </button>
            <button onClick={handleLogout} style={{ padding: "8px 12px", borderRadius: 8, background: "#ff3f6c", color: "white", border: "none" }}>
              Logout
            </button>
          </div>
        </div>

        <div style={{ background: "white", padding: 20, borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>Welcome, {admin.username}</h3>
          <p>From here you can create tasks that will be visible to all students.</p>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("/admin/tasks/create")} style={{ padding: "10px 14px", borderRadius: 8, background: "#1976d2", color: "white", border: "none" }}>
              Create Task
            </button>
            <button onClick={() => navigate("/admin/tasks")} style={{ padding: "10px 14px", borderRadius: 8, background: "#ff9800", color: "white", border: "none" }}>
              View Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
