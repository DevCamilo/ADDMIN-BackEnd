'use strict'

const express = require('express');
const api = express.Router();
const StatsController = require('../controllers/StatsController');

api.get('/show-counts', StatsController.countAllModels);

module.exports = api;