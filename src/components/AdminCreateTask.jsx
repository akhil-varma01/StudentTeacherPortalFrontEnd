// AdminTaskCreate.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AdminTaskCreate() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assigned_to: "",
  });
  const [message, setMessage] = useState("");

  // ✅ FETCH STUDENTS
  useEffect(() => {
    api.get("/students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating...");

    const payload = {
      title: form.title,
      description: form.description,
      assigned_to: form.assigned_to === "" ? "" : Number(form.assigned_to),
    };

    try {
      await api.post("/api/admin/tasks/create/", payload);
      setMessage("Task created successfully!");
      setTimeout(() => navigate("/admin/tasks"), 800);
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Failed to create task"
      );
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Create Task</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, borderRadius: 6 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Assign to</label>
          <select
            name="assigned_to"
            value={form.assigned_to}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6 }}
          >
            <option value="">All Users (Global)</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.username})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Create Task
        </button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}

export default AdminTaskCreate;
