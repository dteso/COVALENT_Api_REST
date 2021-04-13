require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//CREACIÓN DEL SERVIDOR EXPRESS
const app = express();

//CONFIGURAR CORS
app.use(cors());

//CONEXIÓN BASE DE DATOS
dbConnection();

//RUTAS
app.get('/', (req, res) => {
  console.log("GET REQUEST");
  res.status(200).json({
    ok: true,
    msg: "Get Request Ok"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});