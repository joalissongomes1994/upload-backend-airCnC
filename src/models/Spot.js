const mongoose = require('mongoose');

//Criando a estrutura do usuário
const SpotSchema = new mongoose.Schema({
    //imagem
    thumbnail: String,
    //empresa
    company: String,
    //preço
    price:Number,
    //tecnologias que a empresa trata
    techs:[String],
    //usuário que criou o spot no banco de dados
    user: {
        //buscando id do usuário
        type: mongoose.Schema.Types.ObjectId,
        //referenciando para qual model é essa informação
        ref:'User'
    }
}, { 
        toJSON: {
            virtuals: true
        }
    }
);


SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`
});

//Exportando o model spotSchema
module.exports = mongoose.model('Spot', SpotSchema);