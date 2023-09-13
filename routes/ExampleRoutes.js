const express = require('express');
const router = express.Router();
const CarteiraController = require('../controller/CarteiraController');


router 
    .get('/', CarteiraController.getAllCarteiras)
    .get('/:id', CarteiraController.getById)
    .post('/', CarteiraController.create)
    .patch('/:id', CarteiraController.updateById)
    .delete('/:id', CarteiraController.deleteById)

module.exports = router;