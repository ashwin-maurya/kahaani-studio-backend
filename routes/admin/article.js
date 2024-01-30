const express = require("express");
const router = express.Router();
const Articles = require("../../models/ArticleCards");
const ArticleContent = require("../../models/ArticleContent");
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
    const articleContent = new ArticleContent({ content });
    const savedArticleContent = await articleContent.save();

    // Create the Blog with the reference to BlogContent
    const articles = new Articles({
      title,
      category,
      location,
      imageURL,
      articleContent: savedArticleContent._id,
    });

    const savedArticles = await articles.save();

    res.json(savedArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getArticle", async (req, res) => {
  try {
    const articles = await Articles.find({}, { articleContent: 0 }).exec();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getArticlesWithContent/:articleId", async (req, res) => {
  try {
    const { articleId } = req.params;

    const articles = await Articles.findOne({ _id: articleId })
      .populate("articleContent")
      .exec();

    if (!articles) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
