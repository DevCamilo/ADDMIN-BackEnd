'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
    name: String,
    lastName: String,
    telephone: String,
    tower: String,
    apto: String,
    typeUser: Number,
    status: { type: Boolean, default: true },
    email: String,
    password: String
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('users', User);
