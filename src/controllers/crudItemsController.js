
class CrudItemsController {
    constructor(database) {
        this.database = database;
    }

    async create(req, res) {
        try {
            const { name, description } = req.body;
            const query = "INSERT INTO items (name, description) OUTPUT INSERTED.id VALUES (@name, @description)";
            const request = this.database.request();
            request.input('name', name);
            request.input('description', description);
            const result = await request.query(query);
            res.status(201).json({ id: result.recordset[0]?.id, name, description });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async read(req, res) {
        try {
            const query = "SELECT * FROM items";
            const result = await this.database.request().query(query);
            res.status(200).json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const query = "UPDATE items SET name = @name, description = @description WHERE id = @id";
            const request = this.database.request();
            request.input('id', id);
            request.input('name', name);
            request.input('description', description);
            const result = await request.query(query);
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json({ id, name, description });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const query = "DELETE FROM items WHERE id = @id";
            const request = this.database.request();
            request.input('id', id);
            const result = await request.query(query);
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = CrudItemsController;
