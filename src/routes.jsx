import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ItemsDashboard from "./ItemsDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/items" element={<ItemsDashboard />} />
    </Routes>
  );
}
