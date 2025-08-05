//Validación de campos correctos al intentar crear una reserva
const validateBodyArgs = (req, res, next) => {
    const { cancha_id, fecha_inicio, fecha_fin} = req.body;

    if (cancha_id && fecha_inicio && fecha_fin) {
      return next();
    }

    const error = new Error('Invalidate arguments cancha_id, fecha_inicio and fecha_fin are required');
    error.status = 400;
    next(error);
};

//Validación de campos correctos al eliminar una reserva
const validateReservaId = (req, res, next) => {
  const { reserva_id } = req.query;

  if (!reserva_id) {
    return res.status(400).json({ error: 'Expected reserva_id' });
  }
  next();
};

module.exports = {
    validateBodyArgs,
    validateReservaId
}