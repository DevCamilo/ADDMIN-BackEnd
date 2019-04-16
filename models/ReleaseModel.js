'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Release = Schema({
    content: String,
    sender: { type: Schema.ObjectId, ref: 'users' },
    status: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('releases', Release);