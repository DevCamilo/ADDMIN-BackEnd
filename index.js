'use strict'
// Paquetes requeridos
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// Parametros base de datos
const DB = require('./DB');
// Parsear el body a tipo JSON
const bodyParser = require('body-parser');
// Rutas API
const UserRoutes = require('./routes/UserRouter');
const PqrsRoutes = require('./routes/PqrsRouter');
// Conexión base de datos
// En mongoLab
// mongoose.connect(`mongodb://${DB.user}:${DB.password}@${DB.host}:${DB.port}/${DB.database}`, { useNewUrlParser: true }, (err, con) => {
// Local
mongoose.connect(`mongodb://${DB.host}:${DB.port}/${DB.database}`, { useNewUrlParser: true }, (err, con) => {
    if (err) {
        console.log('Error en la conexion');
    } else {
        console.log('Conexion DB Exitosa');
    }
});
// Parsea el body del request en formato JSON
app.use(bodyParser.json());
// Resuelve el error por archivos de origen cruzados
app.use(cors());
// Lista de rutas
app.use(UserRoutes);
app.use(PqrsRoutes);
// Se inicia el servidor
app.listen(3000, () => {
    console.log("Server Corriendo");
});
