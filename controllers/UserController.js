'use strict'

const UserModel = require('../models/UserModel');
const token = require('../middlewares/Auth');

function createUser(req, res) {
    const query = req.body;
    // Verifica que el el correo no exista
    UserModel.find({ email: query.email }, (err, data1) => {
        if (data1.length > 0) {
            res.status(200).send({ status: false, message: 'El email ya existe' });
        } else if (err) {
            res.status(200).send({ status: false, message: 'Fallo al corroborar el email' })
        } else {
            // Registra un nuevo usuario en el sistema
            UserModel.create(query, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Fallo al guardar los datos' });
                } else {
                    res.status(200).send({ status: true, message: 'Usuario creado exitósamente' });
                }
            });
        }
    });
}

function login(req, res) {
    let query = req.body;
    UserModel.find({ email: query.email }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al buscar el usuario' })
        } else if (data.length == 0) {
            res.status(200).send({ status: false, message: 'El usuario no existe' });
        } else {
            UserModel.find({ email: query.email, password: query.password }, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Fallo al buscar la contraseña' });
                } else if (data2.length == 0) {
                    res.status(200).send({ status: false, message: 'Contraseña incorrecta' });
                } else {
                    res.status(200).send({ status: true, data: data2, token: token.createToken(data2[0]._id) });
                }
            });
        }
    });
}

module.exports = {
    createUser
}