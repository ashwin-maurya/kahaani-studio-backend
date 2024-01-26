const express = require("express");
const router = express.Router();
const Blogs = require("../../models/BlogCards");
const BlogContent = require("../../models/BlogContent");

// Route to add a new blog
router.post("/add", async (req, res) => {
  try {
    const { title, category, imageURL, content } = req.body;

    // Assuming you have a separate endpoint for adding blog content
    // Create the BlogContent first
    const blogContent = new BlogContent({ content });
    const savedBlogContent = await blogContent.save();

    // Create the Blog with the reference to BlogContent
    const blog = new Blogs({
      title,
      category,
      imageURL,
      blogContent: savedBlogContent._id,
    });

    const savedBlog = await blog.save();

    res.json(savedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getBlogs", async (req, res) => {
  try {
    const blogs = await Blogs.find({}, { blogContent: 0 }).exec();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getBlogsWithContent", async (req, res) => {
  try {
    const blogs = await Blogs.find({}).populate("blogContent").exec();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
