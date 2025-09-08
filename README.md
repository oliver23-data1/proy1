# Node.js MySQL CRUD Application

This project is a simple CRUD (Create, Read, Update, Delete) application built with Node.js and MySQL. It demonstrates how to set up a basic Express server, connect to a MySQL database, and perform CRUD operations.

## Project Structure

```
node-mysql-crud-app
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers
│   │   └── crudController.js # Controller for handling CRUD operations
│   ├── models
│   │   └── db.js             # Database connection logic
│   ├── routes
│   │   └── crudRoutes.js     # Routes for CRUD operations
│   └── types
│       └── index.d.ts        # TypeScript types and interfaces
├── package.json              # NPM configuration file
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd node-mysql-crud-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Create a `.env` file in the root directory and add your MySQL database credentials:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

2. Start the application:
   ```
   npm start
   ```

3. The server will run on `http://localhost:3000`.

## API Endpoints

- **Create**: `POST /api/items` - Create a new item.
- **Read**: `GET /api/items` - Retrieve all items.
- **Update**: `PUT /api/items/:id` - Update an item by ID.
- **Delete**: `DELETE /api/items/:id` - Delete an item by ID.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.