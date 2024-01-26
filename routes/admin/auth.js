const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Admin = require("../../models/Admin");
const authMiddleware = require("../../middlewares/authMiddleware");
const generateAuthToken = require("../../utils/generateAuthToken");

// Admin Signup
router.post(
  "/signup",
  [
    body("phoneNumber", "Enter a valid phone number").isMobilePhone(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const { phoneNumber, password } = req.body;

      // Check if admin with the given phone number already exists
      let admin = await Admin.findOne({ phoneNumber, isAdmin: true });

      if (admin) {
        return res.status(400).json({
          success: false,
          error: "Admin with this phone number already exists",
        });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new admin Admin
      admin = new Admin({
        phoneNumber,
        password: hashedPassword,
        isAdmin: true,
      });

      await admin.save();

      // Generate JWT token
      const authtoken = generateAuthToken(admin.id, true);

      res.json({
        authtoken,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  [
    body("phoneNumber", "Enter a valid phone number").isMobilePhone(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const { phoneNumber, password } = req.body;

      // Check if admin with the given phone number exists
      let admin = await Admin.findOne({ phoneNumber, isAdmin: true });

      if (!admin) {
        return res.status(400).json({
          success: false,
          error: "Invalid credentials. Please check your credentials",
        });
      }

      // Compare the provided password with the hashed password
      const passwordCompare = await bcrypt.compare(password, admin.password);

      if (!passwordCompare) {
        return res.status(400).json({
          success: false,
          error: "Invalid credentials. Please check your credentials",
        });
      }

      // Generate JWT token
      const authtoken = generateAuthToken(admin.id, true);

      res.json({
        authtoken,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/validate", authMiddleware, (req, res) => {
  res.json({ msg: "Valid authtoken", admin: req.admin });
});

module.exports = router;
