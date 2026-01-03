// src/components/EditUser.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../api";

function EditUser() {
  const navigate = useNavigate();
  const { user, login } = useUser();

  const [formData, setFormData] = useState(user || {});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/students/update/${user.id}/`, formData);

      login(res.data); // update user in context
      alert("Details updated successfully!");
      navigate("/profile");

    } catch (error) {
      alert(
        error.response?.data?.error || "Failed to update details."
      );
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>No user data found. Please login again.</h2>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff3f6c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

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
          width: "440px",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          Edit Profile
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "25px",
          }}
        >
          Update your account information
        </p>

        <form onSubmit={handleSave}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={{ marginBottom: "15px" }}>
              <label
                style={{
                  textTransform: "capitalize",
                  fontWeight: "500",
                  color: "#444",
                }}
              >
                {key}
              </label>

              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "6px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              marginTop: "10px",
            }}
          >
            Save Changes
          </button>

          <button
            onClick={() => navigate("/profile")}
            type="button"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#e0e0e0",
              border: "none",
              marginTop: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Back to Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
