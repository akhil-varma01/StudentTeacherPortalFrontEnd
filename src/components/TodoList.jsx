// src/components/TodoList.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";

function TodoList() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // ✅ LOAD TODOS
  useEffect(() => {
    if (!user) return;

    api.get(`/todos/${user.id}/`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error loading todos:", err));
  }, [user, refresh]);

  // ✅ TOGGLE COMPLETE
  const toggleComplete = async (id) => {
    try {
      await api.patch(`/todos/toggle-complete/${id}/`);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  // ✅ REFRESH AFTER NAVIGATION
  useEffect(() => {
    if (location.state?.refresh) {
      setRefresh((prev) => !prev);
    }
  }, [location.state]);

  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <h2>Please login to view your todos</h2>
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
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Hello, {user.name} 👋
        </h2>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#555",
            fontWeight: "600",
          }}
        >
          Your To-Do List
        </h3>

        <button
          onClick={() => navigate("/todo-create")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            marginBottom: "20px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Add New To-Do
        </button>

        {todos.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#777",
            }}
          >
            No tasks yet. Create your first one!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                padding: "15px",
                borderRadius: "12px",
                background: todo.completed ? "#d4edda" : "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                marginBottom: "15px",
              }}
            >
              <h4
                style={{
                  marginBottom: "5px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                {todo.title}
              </h4>

              <p style={{ marginBottom: "8px", color: "#4e0b0bff" }}>
                {todo.description}
              </p>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "10px 0",
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                Mark as Completed
              </label>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => navigate(`/todo-update/${todo.id}`)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#ff9800",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => navigate(`/todo-delete/${todo.id}`)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#d32f2f",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        <div style={{ marginTop: "20px", display: "flex", gap: "30px" }}>
          <button
            onClick={() => navigate("/profile")}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#e0e0e0",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
