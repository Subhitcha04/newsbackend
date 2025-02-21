require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ✅ Connect to database
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS Configuration (Allow All Methods from Any Origin)
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow all necessary request types
  })
);

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

// ✅ Register all routes
app.use("/api/auth", authRoutes); // Includes register & login
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/test", testRoutes); // Test route

// ✅ Default route
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
