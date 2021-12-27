"use strict";
require('dotenv').config();
const express = require('express');
const notFound =  require('../error-handlers/404');
const router = express.Router();
const Users = require('../models/Users')
const basicAuth = require('../middleware/basicAuth')
// Routes here
router.get('/', (req, res) => {
    res.send('welcome from the Home page 😄');
  })

// Auth Routes
router.post('/signup',Users.addUserHandler);    
router.post('/signin',Users.loginUserHandler);
router.get('*',notFound);

module.exports = router;