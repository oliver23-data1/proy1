const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { setRoutes: setCrudItemsRoutes } = require('./routes/crudItemsRoutes');
const { setRoutes: setCrudUsersRoutes } = require('./routes/crudUsersRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setCrudItemsRoutes(app);
setCrudUsersRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});