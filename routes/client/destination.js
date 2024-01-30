const express = require("express");
const router = express.Router();
const Destinations = require("../../models/Destinations");

// Route to fetch all details from the Destinations database
router.get("/getDestinations", async (req, res) => {
  try {
    const destinations = await Destinations.find({})
      .sort({ content: -1 })
      .exec();
    res.json(destinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
