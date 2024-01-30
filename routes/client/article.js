const express = require("express");
const router = express.Router();
const Articles = require("../../models/ArticleCards");

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

router.get("/fetchArticleByDestination/:location", async (req, res) => {
  try {
    const { location } = req.params;

    // Use a regular expression with the case-insensitive flag
    const articles = await Articles.find(
      { location: { $regex: new RegExp(location, "i") } },
      { articleContent: 0 }
    );

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
