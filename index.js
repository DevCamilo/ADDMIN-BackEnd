'use strict'
// Paquetes requeridos
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// Parametros base de datos
const DB = require('./config/DB');
// Parsear el body a tipo JSON
const bodyParser = require('body-parser');
// Rutas API
const UserRoutes = require('./routes/UserRouter');
const PqrsRoutes = require('./routes/PqrsRouter');
const ReleaseRoutes = require('./routes/ReleaseRouter');
const StatsRoutes = require('./routes/StatsRouter');
const EmailRoutes = require('./routes/EmailRouter');
// Conexión base de datos
// En mongoLab
// mongoose.connect(`mongodb://${DB.user}:${DB.password}@${DB.hostMLab}:${DB.portMLab}/${DB.databaseMLab}`, { useNewUrlParser: true }, (err, con) => {
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
app.use(ReleaseRoutes);
app.use(StatsRoutes);
app.use(EmailRoutes);
// Se inicia el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Server Corriendo");
});
