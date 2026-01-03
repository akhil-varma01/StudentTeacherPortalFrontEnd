// UserDelete.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

function DeleteUser() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>No user data found. Please login again.</h2>
        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#ff3f6c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/students/delete/${user.id}/`);
      alert("Your account has been deleted successfully.");
      logout();
      navigate("/login");
    } catch (error) {
      alert("Failed to delete your account. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            color: "#d32f2f",
            marginBottom: "10px",
          }}
        >
          Delete Account
        </h2>

        <h3 style={{ marginBottom: "10px", fontWeight: "600" }}>
          Hi, {user.name} 👋
        </h3>

        <p style={{ color: "#555", marginBottom: "25px" }}>
          Are you sure you want to permanently delete your account?
          <br />
          <b style={{ color: "#d32f2f" }}>This action cannot be undone.</b>
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={handleConfirmDelete}
            style={{
              padding: "12px",
              backgroundColor: "#d32f2f",
              color: "white",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Yes, Delete My Account
          </button>

          <button
            onClick={handleCancel}
            style={{
              padding: "12px",
              backgroundColor: "#e0e0e0",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Cancel & Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
