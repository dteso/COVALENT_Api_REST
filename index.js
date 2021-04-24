require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//CREACIÓN DEL SERVIDOR EXPRESS
const app = express();

//CONFIGURAR CORS
app.use(cors());

//PARSEO DEL BODY
app.use(express.json());

//CONEXIÓN BASE DE DATOS
dbConnection();

//RUTAS
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/search', require('./routes/search.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/systems', require('./routes/system.routes'));
app.use('/api/devices', require('./routes/device.routes'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});