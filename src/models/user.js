const db = require('../db');

//Método para obtener lista de todos los usuarios
const getAllUsers = async () => {
    const result = await db.query(
        `SELECT * FROM Usuarios`
    );
    return result.rows;
};

//Método para crear un nuevo usuario
const createUser = async (data) => {
    const result = await db.query(
        `INSERT INTO Usuarios (nombre, correo, telefono)
        VALUES ($1,$2,$3)`,
        [data.nombre, data.correo, data.telefono]
    );
};

module.exports = {
    getAllUsers,
    createUser
};