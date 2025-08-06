const validateBodyArgs = (req, res, next) => {
    const { nombre, ubicacion, tipo} = req.body;

    if (nombre && ubicacion && tipo) {
      return next();
    }

    const error = new Error('Invalidate arguments nombre, ubicacion and tipo are required');
    error.status = 400;
    next(error);
};

module.exports = {validateBodyArgs};