const CrudController = require('../controllers/crudController');
const { poolPromise } = require('../models/db');

function setRoutes(app) {
	poolPromise.then(pool => {
		const crudController = new CrudController(pool);

		app.post('/api/items', crudController.create.bind(crudController));
		app.get('/api/items', crudController.read.bind(crudController));
		app.put('/api/items/:id', crudController.update.bind(crudController));
		app.delete('/api/items/:id', crudController.delete.bind(crudController));
	});
}

module.exports = { setRoutes };