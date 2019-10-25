//index => retorna uma listagem de sessões
//show => retorna a lista de uma única sessão
//store => Cria uma sessão
//update => Altera uma sessão
//destroy => Deleta uma sessão

//req.query => Acessar o query params (Para Filtros)
//req.params => Acessar route params (para edição ou delete)
//req.body => Acessar corpo da requisição (para criação e edição)

//Importando arquivo model de user
const User = require('../models/User');

module.exports = {
    //Criando função assícrona
    async store(req, res) {
        const { email } = req.body;

        //Trata a questão de duplicidade de cadastro de email
        let user = await User.findOne({ email });

        if(!user){
            //await => Aguarda alguma instrução ser executada
            user = await User.create({ email });
        }
        //Retorna o usuário
        return res.json(user);
    }
}