'use strict'
const typePayment = require('../models/TypePaymentModel');
const payment = require('../models/PaymentModel');
const moment = require('moment');

// Inicio API's de pagos

function createPayment(req, res) {
    const body = req.body;
    payment.create(body, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al crear el pago" });
        } else {
            res.status(200).send({ status: true, message: "Pago creado exitósamente" });
        }
    });
}

function findAllPayment(req, res) {
    payment.find({ status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al listar los pagos" });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function findPaymentById(req, res){
    const query = req.query;
    payment.findById(query.id, (err, data) => {
        if(err){
            res.status(200).send({ status: false, message: "Fallo al listar el pago" });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    })
}

function updatePayment(req, res){
    const update = req.body;
    update.updated_at = new Date(moment().toISOString());
    payment.findByIdAndUpdate(update.id, update, (err, data) => {
        if(err){
            res.status(200).send({ status: false, message: "Fallo al actualizar el pago" });
        } else {
            res.status(200).send({ status: true, message: "Pago actualizado exitósamente" });
        }
    });
}

function deletePayment(req, res){
    const query = req.query;
    payment.findByIdAndUpdate(query.id, {
        status: false,
        updated_at: new Date(moment().toISOString())
    }, (err, data) => {
        if(err){
            res.status(200).send({ status: false, message: "Fallo al eliminar el pago" });
        } else {
            res.status(200).send({ status: true, message: "Pago eliminado exitósamente" });
        }
    })
}

// Inicio API's de tipo de pago

function createTypePayment(req, res) {
    const body = req.body;
    typePayment.create(body, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al crear el tipo de pago" });
        } else {
            res.status(200).send({ status: true, message: "Tipo de pago creado exitósamente" });
        }
    });
}

function findAllTypePayment(req, res) {
    typePayment.find({ status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al listar los tipos de pagos" });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function findTypePaymentById(req, res) {
    const query = req.query;
    typePayment.findById(query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al busacar el tipo de pago" });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function updateTypePayment(req, res) {
    const update = req.body;
    update.updated_at = new Date(moment().toISOString());
    typePayment.findByIdAndUpdate(update.id, update, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al actualizar el tipo de pago" });
        } else {
            res.status(200).send({ status: true, message: "Tipo de pago actualizado exitósamente" });
        }
    });
}

function deleteTypePayment(req, res) {
    const query = req.query;
    typePayment.findByIdAndUpdate(query.id, {
        status: false,
        updated_at: new Date(moment().toISOString())
    }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al eliminar el tipo de pago" });
        } else {
            res.status(200).send({ status: true, message: "Tipo de pago eliminado exitósamente" });
        }
    });
}

module.exports = {
    createPayment,
    findAllPayment,
    findPaymentById,
    updatePayment,
    deletePayment,
    createTypePayment,
    findAllTypePayment,
    findTypePaymentById,
    updateTypePayment,
    deleteTypePayment
}