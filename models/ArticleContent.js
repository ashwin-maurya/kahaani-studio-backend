const mongoose = require("mongoose");

const ArticleContentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
});

module.exports = mongoose.model("ArticleContent", ArticleContentSchema);
