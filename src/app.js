const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT

//Definición de Routers
const usersRouter = require('./routes/users')
const courtsRouter = require('./routes/canchas')
const reservasRouter = require('./routes/reservas')

app.use(cors());
app.use(express.json());

//Definición de rutas
app.use('/usuario', usersRouter);
app.use('/courts', courtsRouter);
app.use('/reservas', reservasRouter);

//Swagger
const setupSwagger = require('./swagger');
setupSwagger(app);

//Middleware Global
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: status
    }
  });
});

// Escuchar
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});