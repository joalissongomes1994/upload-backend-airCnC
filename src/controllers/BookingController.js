const Booking = require("../models/Booking");

module.exports = {
  //Criando uma nova reserva
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    //Mostrando todas as informações sobre o usuário
    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    //procurando pelo dono do spot cadastrado
    const ownerSocket = await req.connectedUsers[booking.spot.user];

    //Verificando se o dono do spot está ativo
    if (ownerSocket) {
      // req.io => constante criada no arquivo SERVER.js
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  }
};
