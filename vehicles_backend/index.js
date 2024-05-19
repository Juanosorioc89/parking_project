const express = require('express');
const { getConnetion } = require('./db/connect-mongo');

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const host = '0.0.0.0';

app.use(cors());

// Conexión a MongoDB
getConnetion();

// Importar rutas
app.use(express.json());
app.use('/users', require('./routes/users'));
app.use('/vehicles', require('./routes/vehicles'));
app.use('/cells', require('./routes/cells'));
app.use('/payments', require('./routes/payments'));
app.use('/incidents', require('./routes/incidents'));



// Inicio del servidor
app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
});