const express = require('express');
const ArticleController = require('../controller/ArticleController');
const route = express.Router();

route
    .get('/api/article/:page', ArticleController.getAll)
    .post('/api/article/', ArticleController.create)
    .post('/api/article/like/:id', ArticleController.likeArticle)
module.exports = route;