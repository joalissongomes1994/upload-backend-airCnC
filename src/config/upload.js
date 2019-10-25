//Importando blibioteca instalada multer
const multer = require('multer');
const path = require('path');

//Exportando objeto que vai ter várias configurações
module.exports = {
    //Storage => responsável pela forma de armazenamento das imagens ou arquivos que multer vai receber da aplicação
    storage: multer.diskStorage({
        //destination => Pasta onde será salvo os arquivos
        //path.resolve(__dirname, '..', '..', 'upload') => procura a pasta upload e faz o mapeamento
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //filename => Informa como deve ser o formato do nome do arquivo
        filename: (req, file, cb) => {
            //Formando o nome do aluno
            //file.fieldname => nome do arquivo
            //Date.now() => À cada secundo gera um valor unitário (paara garantir que seja uma identificação única)
            //path.extname(file.originalname) => Busca qual é a extenção do arquivo
            const ext = path.extname(file.originalname);
            //path.basename(file.originalname) => Retorna o nome de uma imagem sem a extenção
            const name = path.basename(file.originalname);

            cb(null, `${name}-${Date.now()}${ext}`);
        }
    }),
}