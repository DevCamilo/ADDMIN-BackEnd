'use strict'
const PaymentController = require('../controllers/PaymentController');
const Auth = require('../middleware/Auth');
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const api = express.Router();

// Inicio API's de pagos

api.post('/create-payment', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        id_user: Joi.string().required(),
        id_type_payment: Joi.string().required(),
        final_value: Joi.number().integer().required(),
        discount_value: Joi.number().integer().required(),
        original_value: Joi.number().integer().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PaymentController.createPayment);

api.get('/list-all-payment', Auth.isAuth, PaymentController.findAllPayment);

api.get('/list-paymet-by-id/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PaymentController.findPaymentById);

api.post('/update-payment', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        id: Joi.string().required(),
        id_user: Joi.string().required(),
        id_type_payment: Joi.string().required(),
        final_value: Joi.number().integer().required(),
        discount_value: Joi.number().integer().required(),
        original_value: Joi.number().integer().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PaymentController.updatePayment);

api.get('/delete-payment', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.number().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PaymentController.deletePayment);

// Inicio API's de tipo de pagos

api.post('/create-type-payment', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().integer().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PaymentController.createTypePayment);

api.get('/list-all-type-payment', Auth.isAuth, PaymentController.findAllTypePayment);

api.get('/list-type-payment-by-id', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PaymentController.findTypePaymentById);

api.post('/update-type-payment', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().integer().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PaymentController.updateTypePayment);

api.get('/delete-type-payment', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, PaymentController.deleteTypePayment);

module.exports = api;