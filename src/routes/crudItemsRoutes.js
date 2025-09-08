const CrudItemsController = require('../controllers/crudItemsController');
const { poolPromise } = require('../models/db');

function setRoutes(app) {
	poolPromise.then(pool => {
		const crudItemsController = new CrudItemsController(pool);

		app.post('/api/items', crudItemsController.create.bind(crudItemsController));
		app.get('/api/items', crudItemsController.read.bind(crudItemsController));
		app.put('/api/items/:id', crudItemsController.update.bind(crudItemsController));
		app.delete('/api/items/:id', crudItemsController.delete.bind(crudItemsController));
	});
}

module.exports = { setRoutes };