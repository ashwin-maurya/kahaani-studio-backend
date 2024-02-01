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

DestinationSchema.index({ location: "text" });

module.exports = mongoose.model("Destinations", DestinationSchema);
