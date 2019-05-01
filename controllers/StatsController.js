'use strict'

const UserModel = require('../models/UserModel');
const PqrsModel = require('../models/PqrsModel');
const ReleaseModel = require('../models/ReleaseModel');
const TypePqrs = require('../models/TypePqrsModel');

function countAllModels(req, res) {
    UserModel.count().exec((err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al contar' });
        } else {
            PqrsModel.count().exec((err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Error al contar' });
                } else {
                    ReleaseModel.count().exec((err3, data3) => {
                        if (err3) {
                            res.status(200).send({ status: false, message: 'Error al contar' });
                        } else {
                            res.status(200).send({
                                status: true, data: [
                                    {
                                        name: 'Usuarios',
                                        count: data,
                                        icon: 'groups'
                                    },
                                    {
                                        name: 'PQRS',
                                        count: data2,
                                        icon: 'record_voice_over'
                                    },
                                    {
                                        name: 'Comunicados',
                                        count: data3,
                                        icon: 'comment'
                                    }
                                ]
                            });
                        }
                    })
                }
            });
        }
    });
}

function countPqrs(req, res) {
    PqrsModel.aggregate([
        {
            $sort: { created_at: -1 }
        },
        {
            $group: {
                _id: '$type',
                count: { $sum: 1 }
            }
        }
    ]).exec((err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al contar las PQRS' });
        } else {
            TypePqrs.populate(data, { path: '_id', select: ['name']}, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Error al popular las PQRS' });
                } else {
                    res.status(200).send({ status: true, data: data2 });
                }
            })
        }
    })
}


module.exports = {
    countAllModels,
    countPqrs
}   