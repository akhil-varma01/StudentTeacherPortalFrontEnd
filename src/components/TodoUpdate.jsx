// TodoUpdate.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TodoUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  // ✅ Fetch the existing todo data
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/todos/get/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
        });
      })
      .catch((err) => console.error("Error fetching todo:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:8000/todos/update/${id}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      setMessage("Todo updated successfully!");
      setTimeout(() => navigate("/todos"), 1000);
    } else {
      setMessage("Failed to update todo");
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
          Edit To-Do ✏️
        </h2>

        <form onSubmit={handleSave}>
          <label
            style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Update task title"
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
            style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}
          >
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Update task details..."
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
          ></textarea>

          {/* Save Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Save Changes
          </button>
        </form>

        {/* Message */}
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "#777",
            fontWeight: "500",
          }}
        >
          {message}
        </p>

        {/* Back Button */}
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

export default TodoUpdate;
