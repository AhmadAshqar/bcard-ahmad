const mongoose = require("mongoose");

const Address = new mongoose.Schema({
  state: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  country: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  city: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  street: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  houseNumber: {
    type: Number,
    required: true,
    trim: true,
    minLength: 1,
  },
  zip: {
    type: Number,
    trim: true,
    minLength: 4,
    default: 0,
  },
});

module.exports = Address;
