'use strict'
const PqrsModel = require('../models/PqrsModel');
const TypePqrsModel = require('../models/TypePqrsModel');
const UserModel = require('../models/UserModel');
const moment = require('moment');
const mongoose = require('mongoose');

function createPqrs(req, res) {
    const query = req.body;
    PqrsModel.create(query, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al crear la PQRS' });
        } else {
            res.status(200).send({ status: true, message: 'PQRS creada exitosamente' });
        }
    });
}

function findAllPqrs(req, res) {
    PqrsModel.find({ status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al listar las PQRS' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function findPqrsById(req, res) {
    const query = req.query;
    PqrsModel.findById(query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al buscar la PQRS' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    })
}

function findPqrsByIdOrigin(req, res) {
    const query = req.query;
    PqrsModel.find({ id_origin: mongoose.Types.ObjectId(query.id), status: true }).sort({'created_at': -1}).exec((err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al buscar las PQRS' });
        } else {
            UserModel.populate(data, { path: 'id_attendant', select: ['name', 'lastName'] }, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Error al popular el encargado' });
                } else {
                    res.status(200).send({ status: true, data: data2 });
                }
            });
        }
    });
}

function findPqrsByIdAttendant(req, res) {
    const query = req.query;
    PqrsModel.find({ id_attendant: mongoose.Types.ObjectId(query.id), status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al buscar las PQRS' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function groupPqrsByType(req, res) {
    PqrsModel.aggregate([
        {
            $sort: { created_at: -1 }
        },
        {
            $group: {
                _id: '$type',
                info: { $push: "$$ROOT" },
                users: { $push: '$id_origin' },
                count: {
                    $sum:
                    {
                        $cond: { if: { $eq: ['$checked', 'star'] }, then: 1, else: 0 }
                    }
                }
            }
        }
    ]).exec((err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al agrupar las PQRS' });
        } else {
            TypePqrsModel.populate(data, { path: '_id' }, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Error al popular el tipo de PQRS' });
                } else {
                    UserModel.populate(data2, { path: 'users', select: ['name', 'lastName', 'tower', 'apto'] },
                        (err3, data3) => {
                            if (err3) {
                                res.status(200).send({ status: false, message: 'Error al popular los usuarios' });
                            } else {
                                res.status(200).send({ status: true, data: data3 });
                            }
                        });
                }
            })
        }
    });
}

function updatePqrs(req, res) {
    const update = req.body;
    update.updated_at = new Date(moment().toISOString());
    update.checked = 'star_border';
    PqrsModel.findByIdAndUpdate(update.id, update, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al actualizar la PQRS' });
        } else {
            res.status(200).send({ status: true, message: 'PQRS actualizada exitosamente' });
        }
    });
}

function deletePqrs(req, res) {
    const query = req.query;
    PqrsModel.findByIdAndUpdate(query.id, {
        status: false,
        updated_at: new Date(moment().toISOString())
    }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al eliminar la PQRS' });
        } else {
            res.status(200).send({ status: true, message: 'PQRS eliminada exitosamente' });
        }
    })
}

function createTypePqrs(req, res) {
    const query = req.body;
    TypePqrsModel.create(query, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al crear el tipo de PQRS' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de PQRS creada exitósamente' });
        }
    });
}

function findAllTypePqrs(req, res) {
    TypePqrsModel.find({ status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al listar los tipos de PQRS' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function findTypePqrsById(req, res) {
    const query = req.query;
    TypePqrsModel.findById(query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al buscar las PQRS' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function updateTypePqrs(req, res) {
    const update = req.body;
    update.updated_at = new Date(moment().toISOString());
    TypePqrsModel.findByIdAndUpdate(update.id, update, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al actualizar el tipo de PQRS' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de PQRS actualizada exitosamente' });
        }
    });
}

function deleteTypePqrs(req, res) {
    const query = req.query;
    TypePqrsModel.findByIdAndUpdate(query.id, {
        status: false,
        updated_at: new Date(moment().toISOString())
    }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al eliminar el tipo de PQRS' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de PQRS eliminada exitosamente' });
        }
    });
}

module.exports = {
    createPqrs,
    findAllPqrs,
    findPqrsById,
    findPqrsByIdOrigin,
    findPqrsByIdAttendant,
    groupPqrsByType,
    updatePqrs,
    deletePqrs,
    createTypePqrs,
    findAllTypePqrs,
    findTypePqrsById,
    updateTypePqrs,
    deleteTypePqrs
}