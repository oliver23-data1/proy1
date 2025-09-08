const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { poolPromise } = require('../models/db');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('BODY RECIBIDO:', req.body);
    const { Username, Password } = req.body;
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('Username', Username);
        const result = await request.query('SELECT * FROM Users WHERE Username = @Username');
        const user = result.recordset[0];
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
        const valid = await bcrypt.compare(Password, user.PasswordHash);
        if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });
        // Generar JWT
        const token = jwt.sign({ UserID: user.UserID, Username: user.Username, RoleID: user.RoleID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
