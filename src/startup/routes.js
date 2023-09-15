const express = require('express');
const article = require('../routes/article');

module.exports = function(app) 
{
    app.use(express.json());
    app.use('/api/article', article);
 
}