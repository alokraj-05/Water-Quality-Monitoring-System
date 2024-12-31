const mongoose = require("mongoose");
const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    minLength: 10,
    maxLength: 12,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 13,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("signup", signUpSchema);
