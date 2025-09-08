import React, { useEffect, useState } from "react";
import { ItemsDataTableEnhanced } from "./components/ItemsDataTableEnhanced";

export default function ItemsDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener items");
        return res.json();
      })
      .then((data) => {
        setItems(Array.isArray(data) ? data : data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="w-full max-w-3xl mx-auto p-8 rounded-xl shadow-lg bg-white border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">Dashboard de Items</h1>
        {loading && <p className="text-center text-gray-500">Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
  {!loading && !error && <ItemsDataTableEnhanced data={items} />}
      </div>
    </div>
  );
}
