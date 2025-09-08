// Middleware de ejemplo para simular usuario autenticado
app.use((req, res, next) => {
    // Simulación: usuario administrador
    // req.user = { UserID: 1, Username: 'admin01', RoleID: 1 };
    // Simulación: usuario cliente
    // req.user = { UserID: 2, Username: 'cliente01', RoleID: 2 };
    next();
});
