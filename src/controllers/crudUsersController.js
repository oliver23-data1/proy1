const bcrypt = require('bcryptjs');

class CrudUsersController {
    constructor(database) {
        this.database = database;
    }

    async create(req, res) {
        try {
            const { Username, Email, Password, IsActive, RoleID } = req.body;
            const PasswordHash = await bcrypt.hash(Password, 10);
            const query = "INSERT INTO Users (Username, Email, PasswordHash, IsActive, RoleID) OUTPUT INSERTED.UserID VALUES (@Username, @Email, @PasswordHash, @IsActive, @RoleID)";
            const request = this.database.request();
            request.input('Username', Username);
            request.input('Email', Email);
            request.input('PasswordHash', PasswordHash);
            request.input('IsActive', IsActive ?? 1);
            request.input('RoleID', RoleID);
            const result = await request.query(query);
            res.status(201).json({ UserID: result.recordset[0]?.UserID, Username, Email, IsActive, RoleID });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async read(req, res) {
        try {
            const query = `SELECT U.*, R.RoleName FROM Users U LEFT JOIN Roles R ON U.RoleID = R.RoleID`;
            const result = await this.database.request().query(query);
            res.status(200).json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { UserID } = req.params;
            const { Username, Email, Password, IsActive, RoleID } = req.body;
            let PasswordHash;
            if (Password) {
                PasswordHash = await bcrypt.hash(Password, 10);
            }
            const query = "UPDATE Users SET Username = @Username, Email = @Email, " +
                (Password ? "PasswordHash = @PasswordHash, " : "") +
                "IsActive = @IsActive, RoleID = @RoleID WHERE UserID = @UserID";
            const request = this.database.request();
            request.input('UserID', UserID);
            request.input('Username', Username);
            request.input('Email', Email);
            if (Password) request.input('PasswordHash', PasswordHash);
            request.input('IsActive', IsActive);
            request.input('RoleID', RoleID);
            const result = await request.query(query);
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ UserID, Username, Email, IsActive, RoleID });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { UserID } = req.params;
            const query = "DELETE FROM Users WHERE UserID = @UserID";
            const request = this.database.request();
            request.input('UserID', UserID);
            const result = await request.query(query);
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = CrudUsersController;
