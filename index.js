const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const { rateLimiter } = require("./middlewares/rateLimiter");

// Rest of your code
const app = express();
const port = 5001;

connectToMongo();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply the rate limiter to specific routes
app.use("/api/admin/admin", rateLimiter);

// Admin routes
app.use("/api/admin/gallery", require("./routes/admin/gallery"));
app.use("/api/admin/blogs", require("./routes/admin/blogs"));
app.use("/api/admin/admin", require("./routes/admin/auth"));
app.use("/api/admin/article", require("./routes/admin/article"));

//Client Routes
app.use("/api/client/gallery", require("./routes/client/gallery"));
app.use("/api/client/blogs", require("./routes/client/blogs"));
app.use("/api/client/article", require("./routes/client/article"));

app.listen(port, () => {
  console.log(`app listening at port http://localhost:${port}`);
});
