const express = require('express');
const jwt = require('jsonwebtoken');

const dataModel = require('../models/user');
const characterValidator = require('../middlewares/charactervalidation/userCharacterValidation');

//Creación del Router
const usersRouter = express.Router();

//Get para obtener la lista de usuarios
usersRouter.get('/', async (req, res, next) => {
    try {
    const result = await dataModel.getAllUsers();
    res.status(200).json(result);
    } catch (err) {
    next(err);
    }
    return res;
});

//Post para crear un usuarios
usersRouter.post('/register', characterValidator.validateBodyArgsRegister, async (req, res, next) => {
    try {
    const result = await dataModel.createUser(req.body);
    res.status(200).json(result);
    } catch (err) {
    next(err);
    }
});

usersRouter.post('/login', characterValidator.validateBodyArgsLogin, async (req, res, next) => {
    try {
    const { correo, password } = req.body;
    const user = await dataModel.getUserByEmail(correo);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const Cpassword = await dataModel.validatePassword(password, user.password);
    if (!Cpassword) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '3h' });
    res.json({ token });

    } catch (err) {
    next(err);
    }
});

module.exports = usersRouter;