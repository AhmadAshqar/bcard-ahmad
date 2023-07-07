const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  url: {
    type: String,
    min: 14
  },
  alt: {
    type: String,
    min: 2,
    max: 256
  },
});

module.exports = Image;
