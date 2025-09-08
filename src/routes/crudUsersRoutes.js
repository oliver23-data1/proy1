const CrudUsersController = require('../controllers/crudUsersController');
const { poolPromise } = require('../models/db');

function setRoutes(app) {
    poolPromise.then(pool => {
        const crudUsersController = new CrudUsersController(pool);

        app.post('/api/users', crudUsersController.create.bind(crudUsersController));
        app.get('/api/users', crudUsersController.read.bind(crudUsersController));
        app.put('/api/users/:UserID', crudUsersController.update.bind(crudUsersController));
        app.delete('/api/users/:UserID', crudUsersController.delete.bind(crudUsersController));
    });
}

module.exports = { setRoutes };
