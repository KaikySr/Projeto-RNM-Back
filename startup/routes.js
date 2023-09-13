const express = require('express');
const ExampleRoutes = require('../routes/ExampleRoutes');

module.exports = function(app) 
{
    app.use(express.json());
    app.use('/api/example', ExampleRoutes);
 
}