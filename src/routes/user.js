const express = require('express');
const AuthControler = require('../controller/UserController');
const route = express.Router();

route
    .post('/api/register', AuthControler.register)
    
module.exports = route;