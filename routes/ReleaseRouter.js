'use strict'

const express = require('express');
const api = express.Router();
const ReleaseController = require('../controllers/ReleaseController');
const { celebrate, Joi } = require('celebrate');
const Auth = require('../middlewares/Auth');

api.post('/create-release', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        content: Joi.string().required(),
        sender: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReleaseController.createRelease);

api.get('/list-all-releases', Auth.isAuth, ReleaseController.listAllReleases);

api.get('/list-releases-by-id', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReleaseController.listReleaseById);

api.get('/list-releases-by-sender', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReleaseController.listReleaseBySender);

api.post('/update-release', Auth.isAuth, celebrate({
    body: Joi.object().keys({
        content: Joi.string().required(),
        sender: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReleaseController.updateRelease);

api.get('/delete-release', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(200).send({ status: false, message: 'Faltan datos por enviar' });
}, ReleaseController.deleteRelease);

module.exports = api;