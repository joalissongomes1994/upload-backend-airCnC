//Importando o EXPRESS
const express = require("express");

//Importando a lib multer e o arquivo upload.js
const multer = require("multer");
const uploadConfig = require("./config/upload");

//Importando meu arquivo sessionController
const SessionController = require("./controllers/SessionController");
//Importando meu arquivo spotController
const SpotController = require("./controllers/SpotController");
//Importando meu arquivo spotController
const DashboardController = require("./controllers/DashboardController");
//Importando meu arquivo BookingController
const BookingController = require("./controllers/BookingController");

const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

//Pegando o routeador do express e armazenado na constante abaixo
const routes = express.Router();

//Utilizado nas rotas de uploads de imagens
const upload = multer(uploadConfig);

//req.query => Acessar o query params (para filtros)
//req.params => Acessar route params (para edição ou delete)
//req.body => Acessar corpo da requisição (para criação e edição)

//rotas das requisições sessions
routes.post("/sessions", SessionController.store);

//Rota para listar os spots
routes.get("/spots", SpotController.index);
//Rota para criação de spots
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

//Criando rota para o Dashboard
routes.get("/dashboard", DashboardController.show);

//Criando rota para fazer a reserva
routes.post("/spots/:spot_id/bookings", BookingController.store);

routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);

//Exportando as rotas deste arquivo
module.exports = routes;
