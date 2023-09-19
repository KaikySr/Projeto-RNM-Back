const express = require('express');
const AuthControler = require('../controller/UserController');
const route = express.Router();

route
    .post('/register', AuthControler.register)
    .post('/login', AuthControler.login)
    
module.exports = route;