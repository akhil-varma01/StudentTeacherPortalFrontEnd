// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    email: "",
    age: "",
    department: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username.includes(" ")) {
      setMessage("Username should not contain spaces");
      return;
    }

    setMessage("Registering...");

    try {
      const res = await api.post("/register/", formData);

      setMessage("Registration successful!");
      navigate("/login");

    } catch (error) {
      setMessage(
        error.response?.data?.error || "Something went wrong"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(to bottom, #b3f2d0, #8bddb9, #6ac8a3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* BLURRED SHAPES */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "10%",
          width: "180px",
          height: "180px",
          background: "rgba(255,255,255,0.25)",
          borderRadius: "50%",
          filter: "blur(35px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          right: "12%",
          width: "230px",
          height: "230px",
          background: "rgba(255,255,255,0.20)",
          borderRadius: "50%",
          filter: "blur(45px)",
        }}
      />

      <div
        style={{
          width: "450px",
          backdropFilter: "blur(15px)",
          background: "rgba(255, 255, 255, 0.35)",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#003d27",
            fontWeight: "700",
          }}
        >
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={{ marginBottom: "15px" }}>
              <label
                style={{
                  textTransform: "capitalize",
                  fontWeight: "600",
                  color: "#003d27",
                }}
              >
                {key}
              </label>

              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  outline: "none",
                  background: "rgba(255,255,255,0.85)",
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2e7d62",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "15px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.18)",
            }}
          >
            Register
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: message.includes("successful")
                ? "green"
                : "red",
              fontWeight: "600",
            }}
          >
            {message}
          </p>
        )}

        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "12px",
            backgroundColor: "rgba(255,255,255,0.7)",
            border: "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Register;
