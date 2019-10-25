const mongoose = require('mongoose');

//Criando a estrutura do usuário
const userSchema = new mongoose.Schema({
    email: String
});

//Exportando o model userSchema
module.exports = mongoose.model('User', userSchema);