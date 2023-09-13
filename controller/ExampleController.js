const ExampleModel = require('../models/ExampleModel');

class CarteiraController {
    static async create(req, res) {
        const { nome, dataDeCriacao, descricao, saldoAtual } = req.body;

        if (!nome || !dataDeCriacao || !descricao || !saldoAtual)
            return res.status(400).send({ message: "Dados inválidos" })

        const carteiras =
        {
            nome: nome,
            dataDeCriacao: dataDeCriacao,
            descricao: descricao,
            saldoAtual: saldoAtual
        }

        try {
            const c = await ExampleModel.create(carteiras);
            return res.status(201).send({ message: "Carteira criada com sucesso", body: c });
        }
        catch (error) {
            return res.status(500).send({ error: error });
        }
    };

    static async getAllCarteiras(req, res) {
        try {
            const carteira = await ExampleModel.find()
            return res.status(200).send({ data: carteira });
        }
        catch (error) {
            return res.status(500).send({ error: error });
        }
    };

    static async getById(req, res) {
        const { id } = req.params;

        if (!id)
            return res.status(400).send({ message: "No id provider" })

        try {
            const carteira = await ExampleModel.findById(id);
            return res.status(200).json(carteira);
        }
        catch (error) {
            res.status(500).json({ error: error })
        }
    };

    static async updateById(req, res) {
        const { id } = req.params;

        if (!id)
            return res.status(400).send({ message: "Nenhum provedor de id." })

        const carteiras = req.body;

        if (!carteiras.saldoAtual)
            return res.status(400).send({ message: "Nenhum provedor de saldo atual." })

        try 
        {
            const newCarteiras = await ExampleModel.findByIdAndUpdate
                (
                    id,
                    { saldoAtual: carteiras.saldoAtual }
                );
            return res.status(201).send(newCarteiras);
        }
        catch (error) 
        {
            return res.status(500).send({ error: error });
        }
    };

    static async deleteById(req, res) 
    {
        const { id } = req.params;

        if (!id)
            return res.status(400).send({ message: "Nenhum provedor de id." });

        try 
        {
            await ExampleModel.findByIdAndRemove(id);
            return res.status(200).send({ message: "Carteira deletada com sucesso!" })
        }
        catch (error) 
        {
            console.log(error);
            return res.status(500).send({ message: "Algo falhou." })
        }
    };
}

module.exports = CarteiraController