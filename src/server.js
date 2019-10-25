//O Server inicializa o servidor

//Desenvolvendo a API REST

//criando uma constante e Importando o EXPRESS por meio do REQUIRE
const express = require("express");
//criando uma constante e Importando o MONGOOSE por meio do REQUIRE
const mongoose = require("mongoose");

//Importando meu arquivo routes pelo caminho onde o arquivo está
const routes = require("./routes");
//Importando o cors que será responsável pela permissão de qual endereço pode acessar a minha api
const cors = require("cors");

const path = require("path");

//Responsável por permitir aplicação real time
const socketio = require("socket.io");
const http = require("http");

//Criando aplicação
const app = express();
//Real time
const server = http.Server(app);
//responsável por enviar e receber mensagens no frontend e no mobile
const io = socketio(server);

//Criando conecção com o servidor
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack-nyfjf.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Conectando usuário por meio do id
const connectedUsers = {};
//Ouvinte de conexão com o usuário
io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});
//Esse método deve ser feito antes das rotas
app.use((req, res, next) => {
  //permitindo que as rotas tenham acessem o IO
  req.io = io;
  //permitindo que as rotas tenham acesso aos Usuários
  req.connectedUsers = connectedUsers;

  //permite que o fluxo da aplicação continue
  return next();
});

//permite o acesso de qualquer aplicação para minha api, desde que esteja em branco cors()
app.use(cors());

//Deixa explicito o formato json para poder usar em objetos
//É como se fosse um pluggin
app.use(express.json());

app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

//Essa função precisa ser chamado depois de "app.use(express.json());" pois o express lê cada instrução de forma sequencial
app.use(routes);

//Criando ouvinte e passando a porta que será usada na aplicação
server.listen(3333);
