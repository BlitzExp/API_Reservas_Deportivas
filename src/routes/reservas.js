const express = require('express');
const dataModel = require('../models/reserva');

//Creación del Router
const reservasRouter = express.Router();

//Validación de campos correctos al crear usuario
const validateBodyArgs = (req, res, next) => {
    const { usuario_id, cancha_id, fecha_inicio, fecha_fin} = req.body;
    if (usuario_id && cancha_id && fecha_inicio && fecha_fin) {
      return next();
    }
    const error = new Error('Invalidate arguments usuario_id, cancha_id, fecha_inicio and fecha_fin are required');
    error.status = 400;
    next(error);
};

//Get para obtener la lista de reservas por usuario
reservasRouter.get('/', async (req, res, next) => {
try {
    const UserId = req.query.usuario_id;
    const result = await dataModel.getAllSchedules(UserId);
    res.status(200).json(result);
} catch (err) {
    next(err);
}
    return res;
});

//Post para crear una nueva reserva
reservasRouter.post('/', validateBodyArgs, async (req, res, next) => {
try {
    const result = await dataModel.createSchedule(req.body);
    res.status(200).json(result);
} catch (err) {
    next(err);
}
});


//Delete para borrar reservas ya existentes
reservasRouter.delete('/', async (req, res, next) => {
  try {
    const reserva_id = req.query.reserva_id;
    if (reserva_id) {
      const result = await dataModel.deleteSchedule(reserva_id);
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ error: 'Expected reserva_id' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = reservasRouter;