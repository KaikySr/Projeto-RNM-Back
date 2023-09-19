const express = require('express');
const article = require('../routes/article');
const user = require('../routes/user')

module.exports = function(app) 
{
    app.use(express.json());
    app.use('/api/article', article);
    app.use('/api/user', user);
 
}