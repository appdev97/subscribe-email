'use strict';

const express = require('express');
const controller = require('./topics.controller');

const router = express.Router();

// get all topics
router.get('/', controller.read);

module.exports = router;
