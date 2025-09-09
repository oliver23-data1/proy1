import React, { useState } from "react";

export default function UploadExcelForm({ onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("excelFile", file);
    try {
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Error al subir el archivo");
      onUploaded && onUploaded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-md border">
        <h2 className="text-xl font-bold mb-4">Cargar Items por Excel</h2>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full"
          required
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancelar</button>
          <button type="submit" disabled={loading || !file} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            {loading ? "Subiendo..." : "Subir Excel"}
          </button>
        </div>
      </form>
    </div>
  );
}
