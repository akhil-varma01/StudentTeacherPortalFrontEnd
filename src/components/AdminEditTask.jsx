// src/components/AdminEditTask.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function AdminEditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  // ✅ FETCH TASKS & PREFILL FORM
  useEffect(() => {
    api.get("/api/admin/tasks/")
      .then((res) => {
        const t = res.data.find((x) => x.id === Number(id));
        if (t) {
          setForm({
            title: t.title || "",
            description: t.description || "",
          });
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [id]);

  // ✅ UPDATE TASK
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/admin/tasks/update/${id}/`, form);
      setMessage("Updated successfully");
      navigate("/admin/tasks");
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Update failed"
      );
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 20 }}>
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "white",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h2>Edit Task</h2>

        <form onSubmit={handleSave}>
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            style={{
              width: "100%",
              padding: 10,
              margin: "8px 0",
              borderRadius: 8,
            }}
          />

          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            style={{
              width: "100%",
              padding: 10,
              margin: "8px 0",
              borderRadius: 8,
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px 14px",
              background: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: 8,
            }}
          >
            Save
          </button>
        </form>

        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </div>
    </div>
  );
}

export default AdminEditTask;
