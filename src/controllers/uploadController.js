const XLSX = require('xlsx');
const fs = require('fs');
const { poolPromise } = require('../models/db');

const uploadExcel = async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet, {
      defval: ''
    });
    console.log('Registros leídos:', data);

    // Validar que los campos requeridos existan
    for (const row of data) {
      if (!row.name || !row.description) {
        console.log('Fila con campos faltantes:', row);
      }
    }
    console.log('Registros leídos:', data);

    if (!data || data.length === 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Archivo vacío o mal formado' });
    }

    const pool = await poolPromise;
    for (const row of data) {
      const { name, description } = row;
      await pool.request()
        .input('name', name)
        .input('description', description)
        .query('INSERT INTO items (name, description) VALUES (@name, @description)');
    }

    fs.unlinkSync(req.file.path);

    res.json({ mensaje: 'Datos cargados exitosamente', registros: data.length });
  } catch (error) {
    console.error('Error al procesar Excel:', error);
    res.status(500).json({ error: 'Error interno al procesar el archivo' });
  }
};

module.exports = { uploadExcel };
