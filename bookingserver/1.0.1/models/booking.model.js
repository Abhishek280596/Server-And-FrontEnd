const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  id: { type: Number },
  about: { type: String, required: true, minlength: 3, maxlength: 100 },
  seats: { type: Number, required: true, maxlength: 45 },
  tv: { type: String },
  whiteboard: { type: String },
  // features: { type: String },

  image: { type: String },
  price: { type: Number },

  date: { type: Date, default: Date.now() }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
