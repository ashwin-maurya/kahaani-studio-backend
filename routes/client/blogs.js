const express = require("express");
const router = express.Router();
const Blogs = require("../../models/BlogCards");
const BlogContent = require("../../models/BlogContent");

router.get("/getBlogs", async (req, res) => {
  try {
    const blogs = await Blogs.find({}, { blogContent: 0 }).exec();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getBlogsWithContent/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blogs.findOne({ _id: blogId })
      .populate("blogContent")
      .exec();

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
