// UserTasks.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function UserTasks() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:8000/tasks/${user.id}/`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>Please login first</h2>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff3f6c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "20px",
            fontWeight: "600",
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
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Hello, {user.name} 👋
        </h2>
        <h3
          style={{
            textAlign: "center",
            color: "#555",
            marginBottom: "25px",
          }}
        >
          Your Tasks from Admin
        </h3>

        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No tasks assigned yet.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "12px",
                background: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h4
                style={{
                  marginBottom: "6px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                {task.title}
              </h4>
              <p style={{ marginBottom: "8px", color: "#555" }}>
                {task.description}
              </p>

              <p
                style={{
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                {task.assigned_to
                  ? "Assigned directly to you"
                  : "Global task (for everyone)"}
              </p>
            </div>
          ))
        )}

        <button
          onClick={() => navigate("/profile")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}

export default UserTasks;
