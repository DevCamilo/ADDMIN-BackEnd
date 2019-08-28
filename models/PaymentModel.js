'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payment = Schema({
    id_user: { type: Schema.ObjectId, ref: 'users' },
    id_type_payment : { type: Schema.ObjectId, ref: 'type_pqrs' },
    final_value: Number,
    discount_value: Number,
    original_value: Number,
    status: { type: Boolean, default: true },
    status_payment: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('payments', Payment);