'use strict'

const UserModel = require('../models/UserModel');
const PqrsModel = require('../models/PqrsModel');
const ReleaseModel = require('../models/ReleaseModel');

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

module.exports = {
    countAllModels
}   