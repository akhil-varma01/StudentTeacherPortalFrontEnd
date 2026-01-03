// src/components/AdminTasks.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const load = () => {
    fetch("http://127.0.0.1:8000/api/admin/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => load(), []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    const res = await fetch(`http://127.0.0.1:8000/api/admin/tasks/delete/${id}/`, { method: "DELETE" });
    if (res.ok) load();
    else alert("Delete failed");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 20, fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h2>All Tasks</h2>
          <button onClick={() => navigate("/admin/tasks/create")} style={{ padding: "8px 12px", background: "#1976d2", color: "white", border: "none", borderRadius: 8 }}>
            + Create Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id} style={{ background: "white", padding: 14, borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.06)", marginBottom: 12 }}>
              <h4 style={{ margin: "0 0 8px 0" }}>{t.title}</h4>
              <p style={{ margin: "0 0 8px 0" }}>{t.description}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => navigate(`/admin/tasks/edit/${t.id}`)} style={{ padding: "8px 10px", background: "#ff9800", color: "white", border: "none", borderRadius: 8 }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(t.id)} style={{ padding: "8px 10px", background: "#d32f2f", color: "white", border: "none", borderRadius: 8 }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminTasks;
