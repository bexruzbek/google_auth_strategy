const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  googleId: {
    type: String,
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);