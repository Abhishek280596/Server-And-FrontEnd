const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  type: String,
  count: { type: Number }
});

const Counter = mongoose.model("Counter", counterSchema); //'User' is collection name

module.exports = Counter;
