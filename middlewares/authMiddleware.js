const jwt = require("jsonwebtoken");
const JWT_SECRET = "YouwillDieforThat"; // Replace with your actual secret

const authMiddleware = (req, res, next) => {
  const authtoken = req.header("Authorization");

  // Extract the token part after "Bearer "
  const token = authtoken.split(" ")[1];

  // Check if authtoken is provided
  if (!token) {
    return res.status(401).json({ error: "Invalid authtoken" });
  }

  try {
    // Verify the authtoken
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded data to the request object
    req.admin = decoded.Admin;

    // Move to the next middleware
    next();
  } catch (err) {
    console.log("Invalid authtoken, authorization denied");
    res.status(401).json({ error: "Invalid authtoken" });
  }
};

module.exports = authMiddleware;
