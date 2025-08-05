const db = require('../db');
const reservasRouter = require('../routes/reservas');

//Método para obtener lista de reservas por usuario
const getAllSchedules = async (UserId) => {
    const result = await db.query(
        `SELECT r.id AS reserva_id, c.nombre AS cancha_nombre, c.ubicacion, 
        c.tipo, r.fecha_inicio, r.fecha_fin 
        FROM Reservas AS r
        INNER JOIN Canchas AS c
        ON c.id = r.cancha_id
        WHERE r.usuario_id = $1
        ORDER BY fecha_inicio ASC`,
        [UserId]
    );
    return result.rows;
};

//Método para crear una nueva reserva
const createSchedule = async (data, UserId) => {
    await db.query(
        `CALL insert_schedule($1,$2,$3,$4)`,
        [UserId, data.cancha_id, data.fecha_inicio, data.fecha_fin]
    );
    return { message: 'Reserva creada exitosamente' };
};

//Método para válidar que el usuario con la sesión iniciada solo pueda borrar sus reservas.
const validateDeleting = async (reserva_id, UserId) => {
    const result = await db.query(
    `SELECT * FROM Reservas 
    WHERE id = $1 AND usuario_id = $2`, 
    [reserva_id, UserId]);

    return result.rows.length > 0;
};

//Método para borrar una reserva
const deleteSchedule = async (reserva_id) => {
  const result = await db.query(
    `DELETE FROM Reservas WHERE id = $1`,
    [reserva_id]
  );
  return result.rowCount;
};

//Exportar los métodos para uso del router
module.exports = {
    getAllSchedules,
    createSchedule,
    validateDeleting,
    deleteSchedule
};