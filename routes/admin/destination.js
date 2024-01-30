const express = require("express");
const router = express.Router();
const Destinations = require("../../models/Destinations");
const authMiddleware = require("../../middlewares/authMiddleware");

// Route to fetch all details from the Destinations database in ascending order of content
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

router.post(
  "/updateImageURL/:destinationId",
  authMiddleware,
  async (req, res) => {
    try {
      const { imageURL } = req.body;
      const { destinationId } = req.params;

      // Update the image URL for the specified destination
      const updatedDestination = await Destinations.findByIdAndUpdate(
        destinationId,
        { imageURL },
        { new: true }
      );

      if (!updatedDestination) {
        return res.status(404).json({ error: "Destination not found" });
      }

      res.json(updatedDestination);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
