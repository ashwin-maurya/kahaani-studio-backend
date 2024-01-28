// routes/gallery.js

const express = require("express");
const router = express.Router();
const Gallery = require("../../models/Gallery"); // Assuming your model file is in the models directory

router.get("/all", async (req, res) => {
  try {
    // Fetch all images from the database
    const images = await Gallery.find();

    // Respond with the retrieved images
    res.status(200).json(images);
  } catch (error) {
    // Handle errors and provide an appropriate response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
