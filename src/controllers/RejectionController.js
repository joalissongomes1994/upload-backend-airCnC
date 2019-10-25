const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate("spot");

    booking.approved = false;

    await booking.save();

    //procurando pelo id de quem solicitou o spot
    const bookingUserSocket = req.connectedUsers[booking.user];

    //Verificando está ativo
    if (bookingUserSocket) {
      // req.io => constante criada no arquivo SERVER.js
      req.io.to(bookingUserSocket).emit("booking_response", booking);
    }

    return res.json(booking);
  }
};
