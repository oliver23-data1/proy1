import React from "react";

export default function Sidebar({ onNavigate }) {
  const roleId = Number(localStorage.getItem("roleId"));
  // Debug visual para depuración
  console.log("Sidebar roleId:", roleId);
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col shadow-lg fixed left-0 top-0 z-10">
      <div className="p-6 text-2xl font-bold text-gray-800 border-b">Panel</div>
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {roleId === 1 && (
          <button
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 font-medium"
            onClick={() => onNavigate("users")}
          >
            Usuarios
          </button>
        )}
        <button
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 font-medium"
          onClick={() => onNavigate("items")}
        >
          Items
        </button>
      </nav>
    </aside>
  );
}
