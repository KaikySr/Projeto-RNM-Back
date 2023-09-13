const mongoose = require('mongoose');

const ExampleModel = mongoose.model('ExampleModel', 
{
    nome: String,
    dataDeCriacao: Date,
    descricao: String,
    saldoAtual: Number
})

module.exports = ExampleModel;