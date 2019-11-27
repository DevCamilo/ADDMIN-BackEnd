const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    type_reservation: { type: Schema.ObjectId, ref: 'type_reservations' },
    user: { type: Schema.ObjectId, ref: 'users' },
    status: { type: Boolean, default: true },
    date_start: Date,
    date_end: Date,
    color: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('reservations', Reservation);