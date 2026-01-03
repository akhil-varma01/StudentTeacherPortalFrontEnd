// Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontFamily: "sans-serif",
        }}
      >
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

  // ⭐ Common button style with blink effect
  const buttonStyle = {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease-in-out",

    // BLINK animation
    animation: "",
  };

  // Add blink effect using keyframes
  const styles = `
    @keyframes blinkEffect {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }
  `;

  return (
    <>
      {/* Inject blink keyframes into page */}
      <style>{styles}</style>

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
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            Welcome, {user.name} 👋
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <p><b>Username:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Department:</b> {user.department}</p>
            <p><b>Age:</b> {user.age}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Address:</b> {user.address}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            
            {/* My To-Do List */}
            <button
              onMouseEnter={(e) => e.target.style.animation = "blinkEffect 0.3s linear"}
              onAnimationEnd={(e) => e.target.style.animation = ""}
              onClick={() => navigate("/todos")}
              style={{
                ...buttonStyle,
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              My To-Do List
            </button>

            {/* My Tasks */}
            <button
              onMouseEnter={(e) => e.target.style.animation = "blinkEffect 0.3s linear"}
              onAnimationEnd={(e) => e.target.style.animation = ""}
              onClick={() => navigate("/my-tasks")}
              style={{
                ...buttonStyle,
                backgroundColor: "#65a115ff",
                color: "white",
              }}
            >
              My Tasks
            </button>

            {/* Edit Details */}
            <button
              onMouseEnter={(e) => e.target.style.animation = "blinkEffect 0.3s linear"}
              onAnimationEnd={(e) => e.target.style.animation = ""}
              onClick={() => navigate("/edit")}
              style={{
                ...buttonStyle,
                backgroundColor: "#ff9800",
                color: "white",
              }}
            >
              Edit Details
            </button>

            {/* Logout */}
            <button
              onMouseEnter={(e) => e.target.style.animation = "blinkEffect 0.3s linear"}
              onAnimationEnd={(e) => e.target.style.animation = ""}
              onClick={() => {
                logout();
                navigate("/login");
              }}
              style={{
                ...buttonStyle,
                backgroundColor: "#9c27b0",
                color: "white",
              }}
            >
              Logout
            </button>

            {/* Delete Account */}
            <button
              onMouseEnter={(e) => e.target.style.animation = "blinkEffect 0.3s linear"}
              onAnimationEnd={(e) => e.target.style.animation = ""}
              onClick={() => navigate("/delete")}
              style={{
                ...buttonStyle,
                backgroundColor: "red",
                color: "white",
              }}
            >
              Delete Account
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
