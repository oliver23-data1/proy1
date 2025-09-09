const multer = require('multer');
const { uploadExcel } = require('../controllers/uploadController');

const upload = multer({ dest: 'uploads/' });

function setRoutes(app) {
	// Registrar solo el middleware de multer y el controlador
	app.post('/api/upload', upload.single('excelFile'), uploadExcel);
}

module.exports = { setRoutes };
