const mongoose = require("mongoose");

//Criando a estrutura do Booking
const BookingSchema = new mongoose.Schema({
  date: String,
  approved: Boolean,

  //Criando relacionamentos
  user: {
    //buscando id do usuário
    type: mongoose.Schema.Types.ObjectId,
    //referenciando para qual model é essa informação
    ref: "User"
  },
  spot: {
    //buscando id do usuário
    type: mongoose.Schema.Types.ObjectId,
    //referenciando para qual model é essa informação
    ref: "Spot"
  }
});

//Exportando o model spotSchema
module.exports = mongoose.model("Booking", BookingSchema);
