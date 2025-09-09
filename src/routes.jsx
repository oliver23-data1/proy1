import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ItemsDashboard from "./ItemsDashboard";
import Login from "./Login";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return null;
  }
  return children;
}

function RequireAdmin({ children }) {
  const roleId = Number(localStorage.getItem("roleId"));
  if (roleId !== 1) {
    window.location.href = "/items";
    return null;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth><RequireAdmin><Dashboard /></RequireAdmin></RequireAuth>} />
      <Route path="/items" element={<RequireAuth><ItemsDashboard /></RequireAuth>} />
    </Routes>
  );
}
