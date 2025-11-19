const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');

const Usuario = require('../models/usuariosModel');
const mongoose = require('mongoose'); 

const criar = async (req, res) => {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
        return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }

    try {
        const senhaCifrada = cifrarSenha(senha);

        const novoUsuario = await Usuario.create({
            email,
            senha: senhaCifrada
        });
        return res.status(201).json({ 
            _id: novoUsuario._id, 
            email: novoUsuario.email 
        });

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError || error.code === 11000) {
            return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
        }
        return res.status(500).json({ msg: "Erro interno do servidor." });
    }
};

const entrar = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }
    
    try {
        const usuarioEncontrado = await Usuario.findOne({ email });

        if (!usuarioEncontrado || !compararSenha(senha, usuarioEncontrado.senha)) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }
        
        const token = gerarToken({ _id: usuarioEncontrado._id, email: usuarioEncontrado.email });

        return res.status(200).json({ token });

    } catch (error) {     
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }
};

const renovar = async (req, res) => {
    try {
        const novoToken = gerarToken({ 
            _id: req.usuario._id, 
            email: req.usuario.email 
        });
        
    
        return res.status(200).json({ token: novoToken });

    } catch (error) {
        return res.status(500).json({ msg: "Erro ao renovar o token" });
    }
};


const remover = async (req, res) => {
    const { id } = req.params; 
    try {
        const resultado = await Usuario.findByIdAndDelete(id);

        if (!resultado) {
             return res.status(404).json({ msg: "Usuário não encontrado." });
        }

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ msg: "Erro ao remover o usuário." });
    }
};

module.exports = {
    criar,
    entrar,
    renovar,
    remover
};