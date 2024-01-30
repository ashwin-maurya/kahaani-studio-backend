const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  location: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  content: {
    type: Number,
  },
});

module.exports = mongoose.model("Destinations", DestinationSchema);
