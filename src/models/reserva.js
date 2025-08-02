const db = require('../db');

//Método para obtener lista de reservas por usuario
const getAllSchedules = async (UserId) => {
    const result = await db.query(
        `SELECT * FROM Reservas
        WHERE usuario_id = $1
        ORDER BY fecha_inicio ASC`,
        [UserId]
    );
    return result.rows;
};

//Método para crear una nueva reserva
const createSchedule = async (data) => {
    const result = await db.query(
        `CALL insert_schedule($1,$2,$3,$4)`,
        [data.usuario_id, data.cancha_id, data.fecha_inicio, data.fecha_fin]
    );
};

const deleteSchedule = async (reserva_id) => {
    const result = await db.query(
        `DELETE FROM RESERVAS
        WHERE id = $1`,
        [reserva_id]
    );
};

//Exportar los métodos para uso del router
module.exports = {
    getAllSchedules,
    createSchedule,
    deleteSchedule
};