const express = require('express');

const dataModel = require('../models/reserva');
const characterValidator = require('../middlewares/charactervalidation/reservationCharacterValidation');
const authenticator = require('../middlewares/authMiddlewares/reservasAuthMiddleware');

//Creación del Router
const reservasRouter = express.Router();

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener la lista de reservas por usuario
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reserva_id:
 *                     type: integer
 *                   cancha_nombre:
 *                     type: integer
 *                   ubicacion:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                     format: date-time
 *                   fecha_fin:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 */

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

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva de una cancha
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancha_id:
 *                 type: integer
 *               fecha_inicio:
 *                 type: string
 *                 format: date-time
 *               fecha_fin:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalidate arguments cancha_id, fecha_inicio and fecha_fin are required
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 */
reservasRouter.post('/', authenticator.authenticateToken, characterValidator.validateBodyArgs, async (req, res, next) => {
  try {
    const UserId = req.user.userId;
    const result = await dataModel.createSchedule(req.body, UserId);
    res.status(200).json(result);

  } catch (err) {

    next(err);
  }
});


/**
 * 
 * @swagger
 * /reservas:
 *   delete:
 *     summary: Elimina una reserva según el id si le pertenece al usuario registrado
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: query
 *         name: reserva_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a eliminar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation deleted successfully"
 *       400:
 *         description: Se esperaba el parámetro reserva_id
 *       401:
 *         description: Se requiere token de acceso
 *       403:
 *         description: Forbidden - Token inválido o error en la propiedad de reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               invalidToken:
 *                 summary: Token inválido o expirado
 *                 value:
 *                   error: "Missing required fields: nombre, correo, password and telefono are all required"
 *               ownershipFail:
 *                 summary: Error en la propiedad de reserva
 *                 value:
 *                   error: "Failed to validate ownership"
 */
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