const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  location: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  blogContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogContent",
  },
});

module.exports = mongoose.model("Blogs", BlogsSchema);
