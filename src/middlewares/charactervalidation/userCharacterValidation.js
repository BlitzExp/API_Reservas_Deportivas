//Validación de campos correctos al crear usuario
const validateBodyArgsRegister = (req, res, next) => {
  const { nombre, correo, telefono, password } = req.body;

  if (!nombre || !correo || !telefono || !password) {
    return res.status(400).json({ error: 'Missing required fields: nombre, correo, password and telefono are all required' });
  }

  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (typeof nombre !== 'string' || !nameRegex.test(nombre)) {
    return res.status(400).json({ error: 'Invalid argument: nombre must be a non-empty alphabetic string' });
  }

  if (typeof correo !== 'string' || !emailRegex.test(correo)) {
    return res.status(400).json({ error: 'Invalid argument:correo must be a valid email address' });
  }

  if (typeof telefono !== 'string' || !phoneRegex.test(telefono)) {
    return res.status(400).json({ error: 'Invalid argument: telefono must be a 10-digit number' });
  }

  next();
};

//Validación de campos correctos al intentar iniciar sesión
const validateBodyArgsLogin = (req, res, next) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Missing required fields: correo and password are all required' });
  }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof correo !== 'string' || !emailRegex.test(correo)) {
    return res.status(400).json({ error: 'Invalid argument: correo must be a non-empty alphabetic string' });
  }

  next();
};

module.exports = {
    validateBodyArgsRegister,
    validateBodyArgsLogin
};