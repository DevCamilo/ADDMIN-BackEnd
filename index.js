'use strict'
// Paquetes requeridos
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// Parametros base de datos
const DB = require('./config/DB');
// Rutas API
const UserRoutes = require('./routes/UserRouter');
const PqrsRoutes = require('./routes/PqrsRouter');
const ReleaseRoutes = require('./routes/ReleaseRouter');
const StatsRoutes = require('./routes/StatsRouter');
const EmailRoutes = require('./routes/EmailRouter');
const PaymentRoutes = require('./routes/PaymentRouter');
// Conexión base de datos
// En mLab
// mongoose.connect(`mongodb://${DB.user}:${DB.password}@${DB.hostMLab}:${DB.portMLab}/${DB.databaseMLab}`, { useNewUrlParser: true }, (err, con) => {
// Local
mongoose.connect(`mongodb://${DB.host}:${DB.port}/${DB.database}`, { useNewUrlParser: true }, (err, con) => {
    err ? console.log({ message: 'Error en la conexion', err: err }) : console.log('Conexion DB Exitosa')
});
// Parsea el body del request en formato JSON
app.use(express.json());
// Resuelve el error por archivos de origen cruzados
app.use(cors());
// Respuesta del servidor
app.get('/', (req, res) => {
    res.status(200).send({ status: true, message: 'Servidor Funcionando' });
});
// Lista de rutas
app.use(UserRoutes);
app.use(PqrsRoutes);
app.use(ReleaseRoutes);
app.use(StatsRoutes);
app.use(EmailRoutes);
app.use(PaymentRoutes);
// Manejador de error 404   
app.use((req, res) => {
    res.status(200).send({ status: false, message: 'API no econtrada' });
});
// Se inicia el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor Corriendo");
});
