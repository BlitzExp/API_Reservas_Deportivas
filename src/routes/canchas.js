const express = require('express');
const dataModel = require('../models/cancha');

const characterValidator = require('../middlewares/charactervalidation/courtCharacterValidation');
const authenticator = require('../middlewares/authMiddlewares/reservasAuthMiddleware');

//Creación del Router
const canchasRouter = express.Router();

/**
 * @swagger
 * /courts:
 *   get:
 *     summary: Obtiene una lista de canchas registradas
 *     tags:
 *       - Canchas
 *     responses:
 *       200:
 *         description: Devuelve la lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cancha_id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   ubicacion:
 *                     type: string
 *                   tipo:
 *                     type: string
 */
canchasRouter.get('/', async (req, res, next) => {
    try {
    const result = await dataModel.getAllCourts();
    res.status(200).json(result);
    } catch (err) {
    next(err);
    }
    return res;
});

/**
 * @swagger
 * /courts:
 *   post:
 *     summary: Permite a cualquier usuario registrar una cancha
 *     tags:
 *       - Canchas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Devuelve la cancha creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 7
 *                 nombre:
 *                   type: string
 *                   example: Cancha Los Arbustos
 *                 ubicacion:
 *                   type: string
 *                   example: Lomas Verdes 32, GDL
 *                 tipo:
 *                   type: string
 *                   example: futbol
 *       400:
 *         description: Invalidate arguments nombre, ubicacion and tipo are required
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 */
canchasRouter.post('/', authenticator.authenticateToken, characterValidator.validateBodyArgs, async (req, res, next) => {
    try {
    const result = await dataModel.createCourt(req.body);
    res.status(200).json(result);
    } catch (err) {
    next(err);
    }
});

module.exports = canchasRouter;