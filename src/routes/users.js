const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dataModel = require('../models/user');
const characterValidator = require('../middlewares/charactervalidation/userCharacterValidation');

//Creación del Router
const usersRouter = express.Router();

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtiene una lista de usuarios registrados
 *     tags:
 *       - Usuarios
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
 *                   nombre:
 *                     type: string
 */
usersRouter.get('/', async (req, res, next) => {
    try {
    const result = await dataModel.getAllUsers();
    res.status(200).json(result);
    } catch (err) {
    next(err);
    }
    return res;
});

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               password:
 *                 type: string
 *               correo:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *                 minimum: 10
 *                 maximum: 10
 *     responses:
 *       200:
 *         description: Devuelve el usuario creado
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
 *                   example: Edgar
 *                 password:
 *                   type: string
 *                   example: $2a$12$90aefvjklsdhfkj3nkj23lkj
 *                 correo:
 *                   type: string
 *                   example: test@test.com
 *                 telefono:
 *                   type: string
 *                   example: 8888888888
 *       400:
 *         description: Forbidden - Campo vacío o inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               emptyField:
 *                 summary: Uno de los campos a llenar estaba vacío
 *                 value:
 *                   error: "Missing required fields: nombre, correo, password and telefono are all required"
 *               nameCharacterError:
 *                 summary: Caracteres no válidos en el nombre
 *                 value:
 *                   error: "Invalid argument: nombre must be a non-empty alphabetic string"
 *               emailCharacterError:
 *                 summary: Caracteres o formato no válidos en el correo
 *                 value:
 *                   error: "Invalid argument:correo must be a valid email address"
 *               phoneCharacterError:
 *                 summary: Caracteres o formato no válidos en el telefono
 *                 value:
 *                   error: "Invalid argument: telefono must be a 10-digit number"
 */
usersRouter.post('/register', characterValidator.validateBodyArgsRegister, async (req, res, next) => {
    try {
    const result = await dataModel.createUser(req.body);
    res.status(200).json(result);
    } catch (err) {
    next(err);
    }
});

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Entra a la sesión de un usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Devuelve el token JWT válido para verificar la sesión por 3 horas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Forbidden - Campo vacío o inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               emptyField:
 *                 summary: Uno de los campos a llenar estaba vacío
 *                 value:
 *                   error: "Missing required fields: correo and password are all required"
 *               emailCharacterError:
 *                 summary: Caracteres o formato no válidos en el correo
 *                 value:
 *                   error: "Invalid argument:correo must be a valid email address"
 *       401:
 *         description: Invalid credentials
 */
usersRouter.post('/login', characterValidator.validateBodyArgsLogin, async (req, res, next) => {
    try {
    const { correo, password } = req.body;
    const user = await dataModel.getUserByEmail(correo);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const Cpassword = await dataModel.validatePassword(password, user.password);
    if (!Cpassword) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.json({ token });

    } catch (err) {
    next(err);
    }
});

module.exports = usersRouter;