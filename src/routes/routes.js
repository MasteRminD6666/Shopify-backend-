"use strict";
require('dotenv').config();
const express = require('express');
const notFound = require('../error-handlers/404');
const router = express.Router();
const UsersController = require('../Controllers/UsersController')
const AppointmentsController = require('../Controllers/AppointmentsController')
const authenticateToken = require('../middleware/authenticateToken');
const { body, validationResult } = require('express-validator');


// Routes here
router.get('/', (req, res) => {
    res.send('welcome from the Home page 😄');
})

// Auth Routes   
router.post('/signup', body('email').isEmail(),
 // password must be at least 5 chars long
    body('password').isLength({ min: 5 }), UsersController.register);
router.post('/signin', UsersController.login);
router.get('/me', authenticateToken, UsersController.getUserData);
router.get('/users', authenticateToken, UsersController.getByRole);
router.get('/buyers', authenticateToken, UsersController.getBuyers);
router.get('*', notFound);
router.post('/appointments', authenticateToken, AppointmentsController.appointments);
router.patch('/appointments/:id', authenticateToken, AppointmentsController.updateStatus);

module.exports = router;