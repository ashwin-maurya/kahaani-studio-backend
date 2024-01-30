const express = require("express");
const router = express.Router();
const Blogs = require("../../models/BlogCards");
const BlogContent = require("../../models/BlogContent");
const Destinations = require("../../models/Destinations");
const authMiddleware = require("../../middlewares/authMiddleware");

// Route to add a new blog
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, category, location, imageURL, content } = req.body;

    // Find or create the destination based on the location
    let destination = await Destinations.findOne({ location });

    if (!destination) {
      // If the destination doesn't exist, create a new one
      destination = new Destinations({ location, content: 0 });
    }

    // Increment the content count
    destination.content += 1;
    await destination.save();

    // Assuming you have a separate endpoint for adding blog content
    // Create the BlogContent first
    const blogContent = new BlogContent({ content });
    const savedBlogContent = await blogContent.save();

    // Create the Blog with the reference to BlogContent and location
    const blog = new Blogs({
      title,
      category,
      location,
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
