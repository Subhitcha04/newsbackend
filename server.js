require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import models (Ensures registration)
require("./models/User");
require("./models/Bookmark");
require("./models/Comment");
require("./models/NewsArticle");
require("./models/Notification");
require("./models/Reaction");

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const testRoutes = require("./routes/testRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const commentRoutes = require("./routes/commentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reactionRoutes = require("./routes/reactionRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ Register all routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/test", testRoutes); // Test route

// Default route for debugging
app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running..." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
