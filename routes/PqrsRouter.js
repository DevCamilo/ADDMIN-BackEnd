'use strict'
const PqrsController = require('../controllers/PqrsController');
const Auth = require('../middlewares/Auth');
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const api = express.Router();

// Inicio API's de PQRS

api.post('/create-pqrs', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().required(),
        id_origin: Joi.string().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.createPqrs);

api.get('/list-all-pqrs', Auth.isAuth, PqrsController.findAllPqrs);

api.get('/list-pqrs-id', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.findPqrsById);

api.get('/list-pqrs-id-origin/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.number().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.findPqrsByIdOrigin);

api.get('/list-pqrs-id-attendant', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.number().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.findPqrsByIdAttendant);

api.get('/group-pqrs-by-type', Auth.isAuth, PqrsController.groupPqrsByType);

api.post('/update-respone-pqrs', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        response: Joi.string().required(),
        id_attendant: Joi.string().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.updatePqrs);

api.get('/delete-pqrs', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.number().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.deletePqrs);

// Fin API's de PQRS

// Inicio API's de tipos de PQRS

api.post('/create-type-pqrs', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });    
}, PqrsController.createTypePqrs);

api.get('/list-all-type-pqrs', Auth.isAuth, PqrsController.findAllTypePqrs);

api.get('/list-type-pqrs-id', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.findTypePqrsById);

api.post('/update-type-pqrs', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.updateTypePqrs);

api.post('/delete-type-pqrs', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PqrsController.deleteTypePqrs);

// Fin API's de tipos de PQRS

module.exports = api;