const express = require('express');

const dataModel = require('../models/reserva');
const characterValidator = require('../middlewares/charactervalidation/reservationCharacterValidation');
const authenticator = require('../middlewares/authMiddlewares/reservasAuthMiddleware');

//Creación del Router
const reservasRouter = express.Router();

//Get para obtener la lista de reservas por usuario
reservasRouter.get('/', authenticator.authenticateToken, async (req, res, next) => {
  try {
    const UserId = req.user.userId;
    const result = await dataModel.getAllSchedules(UserId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
    return res;
});

//Post para crear una nueva reserva
reservasRouter.post('/', authenticator.authenticateToken, characterValidator.validateBodyArgs, async (req, res, next) => {
  try {
    const UserId = req.user.userId;
    const result = await dataModel.createSchedule(req.body, UserId);
    res.status(200).json(result);

  } catch (err) {

    next(err);
  }
});


//Delete para borrar reservas ya existentes
reservasRouter.delete('/', authenticator.authenticateToken, characterValidator.validateReservaId, async (req, res, next) => {
  try {
    
    const reserva_id = req.query.reserva_id;
    const UserId = req.user.userId;

    const validation = await dataModel.validateDeleting(reserva_id, UserId);

    if(validation){
      const deletedCount = await dataModel.deleteSchedule(reserva_id);
      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      return res.status(200).json({ message: 'Reservation deleted successfully' });
    }
    
    return res.status(403).json({ message: 'Failed to validate ownership' });

  } catch (err) {
    next(err);
  }
});

module.exports = reservasRouter;