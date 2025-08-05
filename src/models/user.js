const db = require('../db');
const bcrypt = require('bcrypt');

//Método para obtener lista de todos los usuarios
const getAllUsers = async () => {
    const result = await db.query(
        `SELECT nombre FROM Usuarios`
    );
    return result.rows;
};

//Método para crear un nuevo usuario
const createUser = async (data) => {
    hashed_password = await bcrypt.hash(data.password, 10);
    const result = await db.query(
        `INSERT INTO Usuarios (nombre, password, correo, telefono)
        VALUES ($1,$2,$3,$4)`,
        [data.nombre, hashed_password, data.correo, data.telefono]
    );
    return result.rows[0];
};

//Obtiene el usuario si es que este existe en la base de datos según el correo
const getUserByEmail = async (correo) => {
  const result = await db.query(
    `SELECT * FROM Usuarios 
    WHERE correo = $1`, 
    [correo]);
  return result.rows[0];
};

//Valida la contraseña comparando la de la base de datos con la ingresada por el usuario
const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

//Exportar los métodos para uso del router
module.exports = {
    getAllUsers,
    createUser,
    getUserByEmail,
    validatePassword
};