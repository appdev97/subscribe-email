'use strict';

const express = require('express');
const controller = require('./subscriptions.controller');

const router = express.Router();

// create subscription
router.post('/', controller.create);

module.exports = router;
