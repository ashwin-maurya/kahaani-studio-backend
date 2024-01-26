// routes/gallery.js

const express = require("express");
const router = express.Router();
const Gallery = require("../../models/Gallery"); // Assuming your model file is in the models directory

// Route to add an image to the database
router.post("/add", async (req, res) => {
  try {
    const { imageURL, imageLocation, imgDescription } = req.body;

    // Validate the required fields
    if (!imageURL) {
      return res.status(400).json({ error: "Image URL is required." });
    }

    // Create a new Gallery document
    const newImage = new Gallery({
      imageURL,
      imageLocation,
      imgDescription,
    });

    // Save the document to the database
    await newImage.save();

    res.status(201).json({ message: "Image added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
