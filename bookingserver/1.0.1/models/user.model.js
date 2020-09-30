const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, minlength: 1, maxlength: 45 },
  email: {
    type: String,

    minlength: 1,
    maxlength: 45,
  },
  password: {
    type: String,

    minlength: 1,
    maxlength: 100,
  },
  mobile: {
    type: Number,

    minlength: 1,
    maxlength: 15,
  },
  hobbies: {
    type: String,
  },
  gender: {
    type: String,

    max: 45,
  },
  image: {
    type: String,
  },
  cpassword: { type: String },
  regDate: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema); //'User' is collection name

module.exports = User;
