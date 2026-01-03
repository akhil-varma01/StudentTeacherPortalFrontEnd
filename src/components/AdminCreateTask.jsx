// AdminTaskCreate.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminTaskCreate() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assigned_to: "" // "" means all users
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // fetch all students to populate dropdown
    fetch("http://127.0.0.1:8000/students/")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating...");

    // prepare payload: assigned_to empty string or student id
    const payload = {
      title: form.title,
      description: form.description,
      assigned_to: form.assigned_to === "" ? "" : Number(form.assigned_to)
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/tasks/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("Task created successfully!");
        // optionally navigate back to admin tasks list
        setTimeout(() => navigate("/admin/tasks"), 800);
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to create task");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
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
