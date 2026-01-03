// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../api";

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [mode, setMode] = useState("student"); // student | admin
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      if (mode === "student") {
        // ✅ STUDENT LOGIN
        const res = await api.post("/login/", {
          username,
          password,
        });

        login(res.data.student);
        navigate("/profile");

      } else {
        // ✅ ADMIN LOGIN
        const res = await api.post("/api/admin/login/", {
          username,
          password,
        });

        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        setMessage("Admin login successful");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Login failed"
      );
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
      {/* background effects */}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <h1 style={{ margin: 0, color: "#003d27" }}>
            Welcome Back
          </h1>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setMode("student")}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background:
                  mode === "student"
                    ? "#2e7d62"
                    : "rgba(255,255,255,0.7)",
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
                background:
                  mode === "admin"
                    ? "#2e7d62"
                    : "rgba(255,255,255,0.7)",
                color: mode === "admin" ? "white" : "#333",
                fontWeight: 600,
              }}
            >
              Admin
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#333" }}>
          {mode === "student"
            ? "Login to your student dashboard"
            : "Admin sign in"}
        </p>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 12, marginBottom: 12 }}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 12, marginBottom: 18 }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              background: "#2e7d62",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            {mode === "student" ? "Login" : "Admin Login"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 14,
              textAlign: "center",
              color: message.includes("successful")
                ? "green"
                : "red",
            }}
          >
            {message}
          </p>
        )}

        {mode === "student" && (
          <button
            onClick={() => navigate("/register")}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 12,
              background: "rgba(255,255,255,0.7)",
              border: "1px solid #ccc",
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            Create New Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
