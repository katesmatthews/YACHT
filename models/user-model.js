const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  portfolio: {
    btc: {
      qty: Number,
      display: Boolean,
    },
    eth: {
      qty: Number,
      display: Boolean,
    },
    ltc: {
      qty: Number,
      display: Boolean,
    },
    xrp: {
      qty: Number,
      display: Boolean,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
