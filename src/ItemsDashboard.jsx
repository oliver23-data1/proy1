import React, { useEffect, useState, useCallback } from "react";
import { ItemsDataTableEnhanced } from "./components/ItemsDataTableEnhanced";
import { CreateItemForm } from "./components/CreateItemForm";
import { EditItemForm } from "./components/EditItemForm"; // Importar EditItemForm

export default function ItemsDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // Estado para el formulario de edición
  const [editingItem, setEditingItem] = useState(null); // Estado para el ítem que se está editando

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al obtener items");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleItemCreated = (newItem) => {
    fetchItems(); // Recargar la lista de ítems
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowEditForm(true);
  };

  const handleItemUpdated = () => {
    fetchItems(); // Recargar la lista de ítems después de la actualización
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este ítem?")) {
      return;
    }

    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar el ítem");
      }

      fetchItems(); // Recargar la lista de ítems después de la eliminación
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="w-full max-w-3xl mx-auto p-8 rounded-xl shadow-lg bg-white border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">Dashboard de Items</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear Nuevo Ítem
        </button>
        {loading && <p className="text-center text-gray-500">Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <ItemsDataTableEnhanced
            data={items}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
          />
        )}
        {showCreateForm && (
          <CreateItemForm
            onClose={() => setShowCreateForm(false)}
            onCreated={handleItemCreated}
          />
        )}
        {showEditForm && editingItem && (
          <EditItemForm
            item={editingItem}
            onClose={() => setShowEditForm(false)}
            onUpdated={handleItemUpdated}
          />
        )}
      </div>
    </div>
  );
}
