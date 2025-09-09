const express = require('express');
const multer = require('multer');
const { uploadExcel } = require('../controllers/uploadController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', upload.single('excelFile'), uploadExcel);

module.exports = router;
