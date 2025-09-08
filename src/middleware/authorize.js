function authorize(roles = []) {
    // roles puede ser un número (RoleID) o array de números
    if (!Array.isArray(roles)) {
        roles = [roles];
    }
    return (req, res, next) => {
        // Suponiendo que el usuario ya está autenticado y su info está en req.user
        // Ejemplo: req.user = { UserID, Username, RoleID, ... }
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }
        if (roles.length && !roles.includes(req.user.RoleID)) {
            return res.status(403).json({ message: 'No autorizado' });
        }
        next();
    };
}

module.exports = authorize;
