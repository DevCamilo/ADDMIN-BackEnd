'use strict'

const express = require('express');
const api = express.Router();
const EmailController = require('../controllers/EmailController');

api.get('/email', EmailController.testEmail);

module.exports = api;