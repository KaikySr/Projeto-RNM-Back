const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const CryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');

class AuthControler 
{
    static async register(req, res) 
    {
       
        // var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        // const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        // const json = JSON.parse(decryptd);

        const { name, email, password, confirmPassword } = req.body.json;
        if (!name)
            return res.status(400).json({ message: "O nome é obrigatório" });
        if (!email)
            return res.status(400).json({ message: "O e-mail é obrigatório" });
        if (!password)
            return res.status(400).json({ message: "A senha é obrigatória" });
        if (password != confirmPassword)
            return res.status(400).json({ message: "As senhas não conferem" });

        const userExist = await User.findOne({ email: email });
        if (userExist)
            return res.status(422).json({ message: "insira outro e-mail" });

        // const passwordCrypt = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
        const salt = await bcrypt.genSalt(12);
        const newPassword = await bcrypt.hash(password, salt);
       
        const user = new User({
            login: email,
            email,
            password: newPassword,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        });

        try {
            await User.create(user);
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed", data: error.message })
        }
    };

    static async login(req, res) 
    {
        // var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        // const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        // const json = JSON.parse(decryptd);

        const { email, password } = req.body.json;
        console.log(req.body.json)
        if (!email)
            return res.status(422).json({ message: "O e-mail é obrigatório" });
        if (!password)
            return res.status(422).json({ message: "A senha é obrigatória" });

        const user = await User.findOne({ email: email });
        console.log(user)
        if (!user)
            return res.status(422).json({ message: "Usuário e/ou senha inválido" });
        if (!await bcrypt.compare (password, user.password))
            return res.status(422).send({ message: "Usuário e/ou senha inválido" })
        try {
                const secret = process.env.SECRET
                const token = jwt.sign(
                    {
                        id: user._id,
                    },
                    secret,
                    {
                        expiresIn: '2 days'
                    }
            );
            return res.status(200).send({ token: token })
        } catch (error) {
            return res.status(500).send({ message: "Something failed", data: error.message })
        }
    }

    static async getUser(_id){
        try{
            const user = await User.findById({ _id })
            return user
        } catch (error){
            throw error;
            
        }
    }
}
module.exports = AuthControler;
