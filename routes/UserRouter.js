'use strict'

const UserController = require('../controllers/UserController');
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const api = express.Router();

api.post('/create-user', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        telephone: Joi.string().required(),
        document: Joi.string().required(),
        typeUser: Joi.number().integer().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({status: false, message: 'Faltan datos por enviar'});
}, UserController.createUser);

module.exports = api;
