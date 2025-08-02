const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT

const usersRouter = require('./routes/users')
const courtsRouter = require('./routes/canchas')
const reservasRouter = require('./routes/reservas')

app.use(cors());
app.use(express.json());

app.use('/usuario', usersRouter);
app.use('/courts', courtsRouter);
app.use('/reservas', reservasRouter);

// Escuchar
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});