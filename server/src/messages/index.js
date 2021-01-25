'use strict';

const express = require('express');
const controller = require('./messages.controller');

const router = express.Router();

// get all messages
router.get('/', controller.read);

// get one message
router.get('/:id', controller.read);

// add message
router.post('/', controller.create);

module.exports = router;
