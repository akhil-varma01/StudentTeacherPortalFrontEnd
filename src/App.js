// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";
import DeleteUser from "./components/DeleteUser";
import Dashboard from "./components/Dashboard";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import TodoUpdate from "./components/TodoUpdate";
import TodoDelete from "./components/TodoDelete";
import AdminDashboard from "./components/AdminDashboard";
import AdminTasks from "./components/AdminTasks";
import AdminCreateTask from "./components/AdminCreateTask";
import AdminEditTask from "./components/AdminEditTask";
import UserTasks from "./components/UserTasks";

function AppContent() {
  const { user } = useUser();
  const location = useLocation();

  // Do NOT show Dashboard on Login or Register pages
  const hideDashboardOn = ["/", "/login"];

  return (
    <>
      {/* Show Dashboard only when user is logged in */}
      {user && !hideDashboardOn.includes(location.pathname) && <Dashboard />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditUser />} />
        <Route path="/delete" element={<DeleteUser />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todo-create" element={<TodoCreate />} />
        <Route path="/todo-update/:id" element={<TodoUpdate />} />
        <Route path="/todo-delete/:id" element={<TodoDelete />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tasks" element={<AdminTasks />} />
        <Route path="/admin/tasks/create" element={<AdminCreateTask />} />
        <Route path="/admin/tasks/edit/:id" element={<AdminEditTask />} />
        <Route path="/my-tasks" element={<UserTasks />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
