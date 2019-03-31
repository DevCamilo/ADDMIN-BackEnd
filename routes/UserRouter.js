'use strict'

const UserController = require('../controllers/UserController');
const express = require('express');
const api = express.Router();

api.get('/test', UserController.apiTest);

module.exports = api;
