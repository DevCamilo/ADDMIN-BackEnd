'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypePyment = Schema({
    name: String,
    description: String,
    value: Number,
    status: { type: Boolean, default: true }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('type_pyments', TypePyment);