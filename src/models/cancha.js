const db = require('../db');

//Método para obtener lista de todas las canchas
const getAllCourts = async () => {
    const result = await db.query(
        `SELECT id AS cancha_id,nombre, ubicacion, tipo FROM Canchas`
    );
    return result.rows;
};

//Método para crear una nueva cancha
const createCourt = async (data) => {
    const result = await db.query(
        `INSERT INTO Canchas (nombre, ubicacion, tipo)
        VALUES ($1,$2,$3)
        RETURNING *`,
        [data.nombre, data.ubicacion, data.tipo]
    );
    return result.rows[0];
};

//Exportar los métodos para uso del router
module.exports = {
    getAllCourts,
    createCourt
};