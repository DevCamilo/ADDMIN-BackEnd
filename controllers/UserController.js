'use strict'

const UserModel = require('../models/UserModel');
const moment = require('moment');
const token = require('../middleware/Auth');

function createUser(req, res) {
    const query = req.body;
    // Verifica que el el correo no exista
    UserModel.find({ email: query.email, status: true }, (err, data1) => {
        if (data1.length > 0) {
            res.status(200).send({ status: false, message: 'El correo ya existe' });
        } else if (err) {
            res.status(200).send({ status: false, message: 'Fallo al corroborar el correo' });
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

function findAllUsers(req, res) {
    UserModel.find({ status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al listar los usuarios' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function findUserById(req, res) {
    const query = req.query;
    UserModel.findById(query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al buscar el usuario' });
        } else if (data == null) {
            res.status(200).send({ status: false, message: 'El usuario no se encuentra dentro del sistema' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function updateUser(req, res) {
    let update = req.body;
    update.updated_at = new Date(moment().toISOString());
    UserModel.findByIdAndUpdate(update._id, update, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al actualizar el usuario' });
        } else {
            res.status(200).send({ status: true, message: 'Usuario actualizado exitosamente' });
        }
    });
}

function deleteUser(req, res) {
    const query = req.query;
    UserModel.findByIdAndUpdate(query.id, {
        status: false,
        updated_at: new Date(moment().toISOString())
    }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al eliminar el usuario' });
        } else {
            res.status(200).send({ status: true, message: 'Usuario eliminado exitosamente' });
        }
    });
}

function login(req, res) {
    let query = req.body;
    // Busca el email del usuario
    UserModel.find({ email: query.email, status: true }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al buscar el email' });
        } else if (data.length == 0) {
            res.status(200).send({ status: false, message: 'El usuario no existe' });
        } else {
            // Busca la contraseña del usuario
            UserModel.find({ email: query.email, password: query.password, status: true }, (err2, data2) => {
                if (err2) {
                    res.status(200).send({ status: false, message: 'Fallo al buscar la contraseña' });
                } else if (data2.length == 0) {
                    res.status(200).send({ status: false, message: 'Contraseña incorrecta' });
                } else {
                    // Crea el token y regresa la info del usuario
                    res.status(200).send({
                        status: true, data: [{
                            _id: data2[0]._id,
                            name: data2[0].name,
                            lastName: data2[0].lastName,
                            telephone: data2[0].telephone,
                            tower: data2[0].tower,
                            apto: data2[0].apto,
                            typeUser: data2[0].typeUser,
                            email: data2[0].email
                        }], token: token.createToken(data2[0]._id)
                    });
                }
            });
        }
    });
}

function changePassword(req, res) {
    const query = req.body;
    UserModel.findById(query._id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error al buscar el usuario' });
        } else {
            if (data.password == query.password) {
                UserModel.findOneAndUpdate(query._id, { password: query.newPassword }, (err2, data2) => {
                    if (err2) {
                        res.status(200).send({ status: false, message: 'Error al actualizar la contraseña' });
                    } else {
                        res.status(200).send({ status: true, message: 'Contraseña actualizada exitosamente' });
                    }
                });
            } else {
                res.status(200).send({ status: false, message: 'La contraseña es incorrecta' });
            }
        }
    })
}

module.exports = {
    createUser,
    findUserById,
    findAllUsers,
    updateUser,
    deleteUser,
    login,
    changePassword
}