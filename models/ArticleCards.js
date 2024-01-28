const mongoose = require("mongoose");

const ArticlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  articleContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArticleContent",
  },
});

module.exports = mongoose.model("Articles", ArticlesSchema);
