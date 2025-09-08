const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { setRoutes: setCrudItemsRoutes } = require('./routes/crudItemsRoutes');
const { setRoutes: setCrudUsersRoutes } = require('./routes/crudUsersRoutes');
const authorize = require('./middleware/authorize');
const jwtAuth = require('./middleware/jwtAuth');
const loginRoute = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de login pública
app.use('/api/login', loginRoute);

// Rutas protegidas para usuarios (solo admin)
app.use('/api/users', jwtAuth, authorize(1));
setCrudUsersRoutes(app);

// Rutas de items accesibles para usuarios autenticados (admin y cliente)
app.use('/api/items', jwtAuth);
setCrudItemsRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});