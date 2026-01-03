// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [mode, setMode] = useState("student"); // "student" or "admin"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      if (mode === "student") {
        const response = await fetch("http://127.0.0.1:8000/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          login(data.student);           // save student in context
          navigate("/profile");
        } else {
          setMessage(data.error || "Login failed");
        }
      } else {
        // Admin login
        const response = await fetch("http://127.0.0.1:8000/api/admin/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          // store admin in localStorage (simple auth)
          localStorage.setItem("admin", JSON.stringify(data.admin));
          setMessage("Admin login successful");
          navigate("/admin-dashboard");
        } else {
          setMessage(data.error || "Admin login failed");
        }
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #b3f2d0, #8bddb9, #6ac8a3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "180px",
          height: "180px",
          background: "rgba(255,255,255,0.25)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "220px",
          height: "220px",
          background: "rgba(255,255,255,0.20)",
          borderRadius: "50%",
          filter: "blur(45px)",
        }}
      />

      <div
        style={{
          width: "420px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.35)",
          padding: "28px",
          borderRadius: "18px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h1 style={{ margin: 0, color: "#003d27" }}>Welcome Back</h1>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => setMode("student")}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: mode === "student" ? "#2e7d62" : "rgba(255,255,255,0.7)",
                color: mode === "student" ? "white" : "#333",
                fontWeight: 600,
              }}
            >
              Student
            </button>
            <button
              onClick={() => setMode("admin")}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: mode === "admin" ? "#2e7d62" : "rgba(255,255,255,0.7)",
                color: mode === "admin" ? "white" : "#333",
                fontWeight: 600,
              }}
            >
              Admin
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#333", marginBottom: 20 }}>
          {mode === "student" ? "Login to your student dashboard" : "Admin sign in"}
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: "600" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              background: "rgba(255,255,255,0.85)",
            }}
          />

          <label style={{ fontWeight: "600" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "18px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              background: "rgba(255,255,255,0.85)",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2e7d62",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            {mode === "student" ? "Login" : "Admin Login"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "14px", textAlign: "center", color: message.includes("successful") ? "green" : "red" }}>
            {message}
          </p>
        )}

        <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
          {mode === "student" ? (
            <button
              onClick={() => navigate("/register")}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "1px solid #ccc",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Create New Account
            </button>
          ) : (
            <div style={{ width: "100%", textAlign: "center", color: "#555", fontSize: 14 }}>
              Use your admin credentials
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
