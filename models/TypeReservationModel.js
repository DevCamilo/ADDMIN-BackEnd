const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeReservation = new Schema({
    name: String,
    description: String,
    color: String,
    status: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('type_reservations', TypeReservation);