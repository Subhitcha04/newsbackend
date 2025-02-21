require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ✅ Connect to Database
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS Configuration (Allow All Origins & Methods)
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow all methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow these headers
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (if needed)

  // ✅ Handle Preflight Requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ✅ Import Models
require("./models/User");
require("./models/Bookmark");
require("./models/Comment");
require("./models/NewsArticle");
require("./models/Notification");
require("./models/Reaction");

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const commentRoutes = require("./routes/commentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reactionRoutes = require("./routes/reactionRoutes");
const testRoutes = require("./routes/testRoutes");

// ✅ Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/test", testRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running..." });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
