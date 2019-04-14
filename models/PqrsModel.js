'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pqrs = Schema({
    title: String,
    description: String,
    type: { type: Schema.ObjectId, ref: 'type_pqrs'},
    id_origin: { type: Schema.ObjectId, ref: 'users' },
    response: String,
    id_attendant: { type: Schema.ObjectId, ref: 'users' },
    checked: { type: String, default: 'star' },
    status: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('pqrs', Pqrs);