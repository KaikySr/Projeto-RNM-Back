const express = require('express');
const AuthorController = require('../controller/AuthorController');
const route = express.Router();

route
    .get('/api/author', AuthorController.getAll)
    .post('/api/author', AuthorController.create)

module.exports = route;