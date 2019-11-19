'use strict'
const typePaymentModel = require('../models/TypePaymentModel');
const paymentModel = require('../models/PaymentModel');
const userModel = require('../models/UserModel');
const mongoose = require('mongoose');
const moment = require('moment');

// Inicio API's de pagos

function createPayment(req, res) {
    const body = req.body;
    paymentModel.create(body, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al crear el pago' });
        } else {
            res.status(200).send({ status: true, message: 'Pago creado exitósamente' });
        }
    });
}

function findAllPayment(req, res) {
    paymentModel.find({ status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al listar los pagos' });
        } else {
            typePaymentModel.populate(data, { path: 'id_type_payment', select: ['name'] }, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Fallo al popular los tipos de pago' });
                } else {
                    userModel.populate(data2, { path: 'id_user', select: ['name', 'lastName'] }, (err3, data3) => {
                        if (err3) {
                            res.status(200).send({ status: false, message: 'Fallo al popular el usuario' });
                        } else {
                            res.status(200).send({ status: true, data: data3 });
                        }
                    });
                }
            });
        }
    });
}

function findPaymentById(req, res) {
    const query = req.query;
    paymentModel.findById(query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al listar los pagos' });
        } else {
            typePaymentModel.populate(data, { path: 'id_type_payment', select: ['name'] }, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Fallo al popular los tipos de pago' });
                } else {
                    userModel.populate(data2, { path: 'id_user', select: ['name', 'lastName'] }, (err3, data3) => {
                        if (err3) {
                            res.status(200).send({ status: false, message: 'Fallo al popular el usuario' });
                        } else {
                            res.status(200).send({ status: true, data: data3 });
                        }
                    });
                }
            });
        }
    });
}

function findPaymentByUserId(req, res) {
    const query = req.query;
    paymentModel.find({ id_user: mongoose.Types.ObjectId(query.id), status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al listar los pagos' });
        } else {
            typePaymentModel.populate(data, { path: 'id_type_payment', select: ['name'] }, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Fallo al popular los tipos de pago' });
                } else {
                    userModel.populate(data2, { path: 'id_user', select: ['name', 'lastName'] }, (err3, data3) => {
                        if (err3) {
                            res.status(200).send({ status: false, message: 'Fallo al popular el usuario' });
                        } else {
                            res.status(200).send({ status: true, data: data3 });
                        }
                    });
                }
            });
        }
    });
}

function updatePayment(req, res) {
    const update = req.body;
    update.updated_at = new Date(moment().toISOString());
    paymentModel.findByIdAndUpdate(update._id, update, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al actualizar el pago' });
        } else {
            res.status(200).send({ status: true, message: 'Pago actualizado exitósamente' });
        }
    });
}

function deletePayment(req, res) {
    const query = req.query;
    paymentModel.findByIdAndUpdate(query.id, {
        status: false,
        updated_at: new Date(moment().toISOString())
    }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al eliminar el pago' });
        } else {
            res.status(200).send({ status: true, message: 'Pago eliminado exitósamente' });
        }
    })
}

// Inicio API's de tipo de pago

function createTypePayment(req, res) {
    const body = req.body;
    typePaymentModel.create(body, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al crear el tipo de pago' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de pago creado exitósamente' });
        }
    });
}

function findAllTypePayment(req, res) {
    typePaymentModel.find({ status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al listar los tipos de pagos' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function findTypePaymentById(req, res) {
    const query = req.query;
    typePaymentModel.findById(query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al busacar el tipo de pago' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function updateTypePayment(req, res) {
    const update = req.body;
    update.updated_at = new Date(moment().toISOString());
    typePaymentModel.findByIdAndUpdate(update.id, update, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al actualizar el tipo de pago' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de pago actualizado exitósamente' });
        }
    });
}

function deleteTypePayment(req, res) {
    const query = req.query;
    typePaymentModel.findByIdAndUpdate(query.id, {
        status: false,
        updated_at: new Date(moment().toISOString())
    }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al eliminar el tipo de pago' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de pago eliminado exitósamente' });
        }
    });
}

module.exports = {
    createPayment,
    findAllPayment,
    findPaymentById,
    findPaymentByUserId,
    updatePayment,
    deletePayment,
    createTypePayment,
    findAllTypePayment,
    findTypePaymentById,
    updateTypePayment,
    deleteTypePayment
}