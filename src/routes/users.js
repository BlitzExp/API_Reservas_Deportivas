const express = require('express');
const dataModel = require('../models/user');

//Creación del Router
const usersRouter = express.Router();

//Validación de campos correctos al crear usuario
const validateBodyArgs = (req, res, next) => {
    const { nombre, correo, telefono} = req.body;
    if (nombre && correo && telefono) {
      return next();
    }
    const error = new Error('Invalidate arguments nombre, correo and telefono are required');
    error.status = 400;
    next(error);
};

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

//Post para crear un usuario
usersRouter.post('/', validateBodyArgs, async (req, res, next) => {
try {
    const result = await dataModel.createUser(req.body);
    res.status(200).json(result);
} catch (err) {
    next(err);
}
});

module.exports = usersRouter;