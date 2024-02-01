const express = require("express");
const router = express.Router();
const Blogs = require("../../models/BlogCards");
const Articles = require("../../models/ArticleCards");
const Destinations = require("../../models/Destinations");

router.get("/searchresults/:searchText", async (req, res) => {
  try {
    const { searchText } = req.params;

    // Check if search text has at least 3 characters
    if (searchText.length < 3) {
      return res
        .status(400)
        .json({ error: "Search text should be at least 3 characters long" });
    }

    // Create a case-insensitive regular expression for partial matching
    const regex = new RegExp(searchText, "i");

    // Search for blogs with partial match
    const blogs = await Blogs.find({ title: { $regex: regex } });

    // Search for articles with partial match
    const articles = await Articles.find({ title: { $regex: regex } });

    // Search for destinations with partial match
    const destinations = await Destinations.find({
      location: { $regex: regex },
    });

    // Prepare a response object with separate arrays for blogs, articles, and destinations
    const results = {
      blogs,
      articles,
      destinations,
    };

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
