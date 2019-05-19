'use strict'

const express = require('express');
const api = express.Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/Auth');
const EmailController = require('../controllers/EmailController');

api.post('/welcome-email', auth.isAuth, celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, EmailController.welcomeEmailMessage);

module.exports = api;