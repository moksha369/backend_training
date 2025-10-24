const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O campo nome é obrigatório.'],
        minLength: [3, 'O nome deve ter no mínimo 3 caracteres.'] 
    },
    preco: {
        type: Number,
        required: [true, 'O campo preço é obrigatório.'] 
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Produto', schema);

