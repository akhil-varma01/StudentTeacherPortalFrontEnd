// src/components/TodoCreate.jsx
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

function TodoCreate() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/todos/${user.id}/`, formData);
      setMessage("Todo added successfully!");
      navigate("/todos");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to add todo"
      );
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
          width: "450px",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
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
          Add New To-Do 📝
        </h2>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              outline: "none",
              fontSize: "14px",
            }}
          />

          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write task details..."
            style={{
              width: "100%",
              padding: "10px",
              height: "90px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              outline: "none",
              resize: "none",
              fontSize: "14px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Add To-Do
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: "#777",
            }}
          >
            {message}
          </p>
        )}

        <button
          onClick={() => navigate("/todos")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#e0e0e0",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          Back to To-Do List
        </button>
      </div>
    </div>
  );
}

export default TodoCreate;
