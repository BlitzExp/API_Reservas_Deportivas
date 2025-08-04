const express = require('express');
const dataModel = require('../models/cancha');

//Creación del Router
const canchasRouter = express.Router();

//Validación de campos correctos al crear usuario
const validateBodyArgs = (req, res, next) => {
    const { nombre, ubicacion, tipo} = req.body;

    if (nombre && ubicacion && tipo) {
      return next();
    }

    const error = new Error('Invalidate arguments nombre, ubicacion and tipo are required');
    error.status = 400;
    next(error);
};

//Get para obtener la lista de usuarios
canchasRouter.get('/', async (req, res, next) => {
    try {
    const result = await dataModel.getAllCourts();
    res.status(200).json(result);
    } catch (err) {
    next(err);
    }
    return res;
});

//Post para crear un usuario
canchasRouter.post('/', validateBodyArgs, async (req, res, next) => {
    try {
    const result = await dataModel.createCourt(req.body);
    res.status(200).json(result);
    } catch (err) {
    next(err);
    }
});

module.exports = canchasRouter;