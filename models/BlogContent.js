const mongoose = require("mongoose");

const BlogContentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
});

module.exports = mongoose.model("BlogContent", BlogContentSchema);
