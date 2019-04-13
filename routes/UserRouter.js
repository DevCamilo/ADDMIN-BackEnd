'use strict'

const UserController = require('../controllers/UserController');
const Auth = require('../middlewares/Auth');
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const api = express.Router();

api.post('/create-user', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        telephone: Joi.string().required(),
        tower: Joi.string().required(),
        apto: Joi.string().required(),
        typeUser: Joi.number().integer().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    if (err.details[0].path[0] == 'email') {
        res.status(200).send({ status: false, message: 'El correo no es válido' });
    } else {
        res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
    }
}, UserController.createUser);

api.get('/user-id/:id?', celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, UserController.findUserById);

api.get('/user-all', Auth.isAuth, UserController.findAllUsers);

api.post('/update-user', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        telephone: Joi.string().required(),
        tower: Joi.string().required(),
        apto: Joi.string().required(),
        typeUser: Joi.number().integer().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    if (err.details[0].path[0] == 'email') {
        res.status(200).send({ status: false, message: 'El correo no es válido' });
    } else {
        res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
    }
}, UserController.updateUser);

api.get('/delete-user/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, UserController.deleteUser);

api.post('/login', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, UserController.login);

module.exports = api;
