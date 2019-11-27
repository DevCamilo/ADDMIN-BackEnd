const mongoose = require('mongoose');
const ReservationModel = require('../models/ReservationModel');
const UserModel = require('../models/UserModel');
const TypeReservationModel = require('../models/TypeReservationModel');

// Inicio API'S de Reserva

async function createReservation(req, res) {
    try {
        const checkReservation = await ReservationModel.find({
            type_reservation: mongoose.Types.ObjectId(req.body.type_reservation),
            date_start: {
                $gte: new Date(req.body.date_start)
            }, date_end: {
                $lte: new Date(req.body.date_end)
            }, status: true
        });
        if (checkReservation.length > 0) {
            res.status(200).send({ status: false, message: 'El área ya se encuentra reservada' });
        } else {
            ReservationModel.create(req.body, (err, data) => {
                if (err) {
                    res.status(200).send({ status: false, message: 'Fallo al guardar la reserva' });
                } else {
                    res.status(200).send({ status: true, message: 'Reserva registrada exitósamente' });
                }
            });
        }
    } catch (e) {
        res.status(200).send({ status: false, message: 'Fallo al revisar la reserva' });
    }
}

async function listReservations(req, res) {
    try {
        const reservations = await ReservationModel.find({ status: true });
        const populeteUsers = await UserModel.populate(reservations, { path: 'user', select: ['name', 'lastName'] });
        const populateTypeReservation = await TypeReservationModel.populate(populeteUsers, { path: 'type_reservation', select: ['name', 'description', 'color'] });
        res.status(200).send({ status: true, data: populateTypeReservation });
    } catch (e) {
        res.status(200).send({ status: false, message: 'Fallo al listar las reservas' });
    }
}

async function listReservationById(req, res) {
    try {
        const reservations = await ReservationModel.findById(req.query.id);
        const populeteUsers = await UserModel.populate(reservations, { path: 'user', select: ['name', 'lastName'] });
        const populateTypeReservation = await TypeReservationModel.populate(populeteUsers, { path: 'type_reservation', select: ['name', 'description', 'color'] });
        res.status(200).send({ status: true, data: populateTypeReservation });
    } catch (e) {
        res.status(200).send({ status: false, message: 'Fallo al lista la reserva' });
    }
}

async function listReservationByIdUser(req, res){
    try {
        const reservations = await ReservationModel.find({ user: req.query.id, status: true });
        const populeteUsers = await UserModel.populate(reservations, { path: 'user', select: ['name', 'lastName'] });
        const populateTypeReservation = await TypeReservationModel.populate(populeteUsers, { path: 'type_reservation', select: ['name', 'description', 'color'] });
        res.status(200).send({ status: true, data: populateTypeReservation });
    } catch (error) {
        res.status(200).send({ status: false, message: 'Fallo al lista las reservas del usuario' });
    }
}

function updateReservation(req, res) {
    ReservationModel.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al actualizar la reserva' });
        } else {
            res.status(200).send({ status: true, message: 'Reserva actualizada exitósamente' });
        }
    });
}

function deleteReservation(req, res) {
    ReservationModel.findByIdAndUpdate(req.query.id, { status: false }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al elimiar la reserva' });
        } else {
            res.status(200).send({ status: true, message: 'Reserva eliminada exitósamente' });
        }
    });
}

// Fin API'S de Reservas    

// Inicio API'S de Tipos de Reservas

function createTypeReservation(req, res) {
    TypeReservationModel.create(req.body, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al crear el tipo de reserva' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de reserva creada exitósamente' });
        }
    });
}

function listTypeReservation(req, res) {
    TypeReservationModel.find({ status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al listar los tipos de reservas' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function listTypeReservationById(req, res) {
    TypeReservationModel.findById(req.query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al listar el tipo de reserva' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function updateTypeReservation(req, res) {
    TypeReservationModel.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al actualizar la reserva' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de rerva actualizado exitosamente' });
        }
    });
}

function deleteTypeReseration(req, res) {
    TypeReservationModel.findByIdAndUpdate(req.query.id, { status: false }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al eliminar la reserva' });
        } else {
            res.status(200).send({ status: true, message: 'Tipo de reserva eliminado exitósamente' });
        }
    });
}

// Fin API'S de Tipo de Pago

module.exports = {
    createReservation,
    listReservations,
    listReservationById,
    listReservationByIdUser,
    updateReservation,
    deleteReservation,
    createTypeReservation,
    listTypeReservation,
    listTypeReservationById,
    updateTypeReservation,
    deleteTypeReseration
}