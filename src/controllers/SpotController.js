//Impportando Spot para criar a informação dentro do banco de dados
const Spot = require('../models/Spot');
const User = require('../models/User');


module.exports = {

    //Retornando uma lista de spots
    async index(req, res) {
        //criando filtro para separa a lista por cada tecnologia desejada pelo usuário
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    //Criando um novo store
    async store(req, res) {
        //Importando o nome que foi salvo no arquivo upload para dentro do banco
        const { filename } = req.file;
        //importando todo o corpo do arquivo
        const { company, techs, price } = req.body;
        //Buscando o id do usuário
        const { user_id } = req.headers;

        //Verificando a existência do usuário
        const user = await User.findById(user_id);
        if(!user) {
            return res.status(400).json({error: "User doent not exists"});
        }

        //criando o Spot e salvando no banco de dados
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            //transforma em array, e tira os espaçamentos do início e do final
            techs: techs.split(',').map(tech => tech.trim()),
            price
        });
        
        return res.json(spot);
    }
};