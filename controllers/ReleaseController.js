'use strict'

const ReleaseModel = require('../models/ReleaseModel');
const moment = require('moment');
const mongoose = require('mongoose');

function createRelease(req, res) {
    const query = req.body;
    ReleaseModel.create(query, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al crear el comunicado' });
        } else {
            res.status(200).send({ status: true, message: 'Comunicado creado exitósamente' });
        }
    });
}

function listAllReleases(req, res) {
    ReleaseModel.find({ status: true }).sort({ created_at: -1 }).populate('sender', ['name', 'lastName']).exec((err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al listar los comunicados' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function listReleaseById(req, res) {
    const query = req.query;
    ReleaseModel.findById(query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al listar el comunicado' });
        } else {
            res.status(200).send({ status: false, data: data });
        }
    });
}

function listReleaseBySender(req, res) {
    const query = req.query;
    ReleaseModel.find({ status: true, sender: mongoose.Types.ObjectId(query.id) }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al listar los comunicados' });
        } else {
            res.status(200).send({ status: false, data: data });
        }
    });
}

function updateRelease(req, res) {
    const query = req.body;
    query.updated_at = new Date(moment().toISOString());
    ReleaseModel.findByIdAndUpdate(query._id, query, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al actualizar el comunicado' });
        } else {
            res.status(200).send({ status: true, message: 'Comunicado actualizado exitósamente' });
        }
    });
}

function deleteRelease(req, res) {
    const query = req.query;
    ReleaseModel.findByIdAndUpdate(query.id, { status: false }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al eliminar el comunicado' });
        } else {
            res.status(200).send({ status: true, message: 'Comunicado eliminado exitósamente' });
        }
    });
}

module.exports = {
    createRelease,
    listAllReleases,
    listReleaseById,
    listReleaseBySender,
    updateRelease,
    deleteRelease
}