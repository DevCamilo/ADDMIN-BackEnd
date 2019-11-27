const express = require('express');
const api = express.Router();
const Auth = require('../middleware/Auth');
const { celebrate, Joi } = require('celebrate');
const ReservationController = require('../controllers/ReservationController');

// Inicio API'S de Reservsas

api.post('/create-reservation', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        type_reservation: Joi.string().required(),
        user: Joi.string().required(),
        date_start: Joi.string().isoDate(),
        date_end: Joi.string().isoDate()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.createReservation);

api.get('/list-reservations', Auth.isAuth, ReservationController.listReservations);

api.get('/list-reservation-by-id/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.listReservationById);

api.get('/list-reservation-by-id-user/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.listReservationByIdUser);

api.post('/update-reservation', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        _id: Joi.string().required(),
        type_reservation: Joi.string().required(),
        user: Joi.string().required(),
        date_start: Joi.string().isoDate(),
        date_end: Joi.string().isoDate()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.updateReservation);

api.get('/delete-reservation/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.deleteReservation);

// Fin de API'S de reservas

// Inicio API'S de tipo de reservas

api.post('/create-type-reservation', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        color: Joi.string().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.createTypeReservation);

api.get('/list-type-reservation', Auth.isAuth, ReservationController.listTypeReservation);

api.get('/list-type-reservation-by-id/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.listTypeReservationById);

api.post('/update-type-reservation', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        color: Joi.string().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.updateTypeReservation);

api.get('/delete-type-reservation/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReservationController.deleteTypeReseration);

module.exports = api;