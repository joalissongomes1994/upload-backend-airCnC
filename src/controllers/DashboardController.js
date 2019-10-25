const Spot = require('../models/Spot');

module.exports = {
    //Criando listagem de Spots feitas por usuários logados
    async show(req, res) {

        //buscando o Id do usuário logado dentro do header
        const { user_id } = req.headers;

        //Buscando todos os Spots que o usuário que possue esse user_id fez
        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }
}
