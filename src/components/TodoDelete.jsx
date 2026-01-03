// TodoDelete.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function TodoDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch(`http://127.0.0.1:8000/todos/delete/${id}/`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Todo deleted successfully!");
      navigate("/todos");
    } else {
      alert("Failed to delete todo");
    }
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
            color: "#d32f2f",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Delete To-Do
        </h2>

        <p style={{ color: "#555", marginBottom: "25px" }}>
          Are you sure you want to permanently delete this task?<br />
          <b style={{ color: "#d32f2f" }}>This action cannot be undone.</b>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            style={{
              padding: "12px",
              backgroundColor: "#d32f2f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Yes, Delete Task
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => navigate("/todos")}
            style={{
              padding: "12px",
              backgroundColor: "#e0e0e0",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
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

export default TodoDelete;
