const express = require("express");
const router = express.Router();
const User = require("../models/User");
const NewsArticle = require("../models/NewsArticle");
const Bookmark = require("../models/Bookmark");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const Reaction = require("../models/Reaction");

// Sample Data Insertion Route
router.post("/insert-sample", async (req, res) => {
    try {
      // Insert sample user
      const user = new User({
        full_name: "Test User",
        email: "testuser@example.com",
        password: "Test@1234"
      });
      await user.save();
  
      // Insert sample news article
      const article = new NewsArticle({
        article_id: "article123",
        title: "Sample News",
        link: "https://example.com/sample-news",
        pubDate: new Date(),
      });
      await article.save();
  
      // Insert sample bookmark
      const bookmark = new Bookmark({
        user_id: user._id,
        article_id: article._id
      });
      await bookmark.save();
  
      res.status(201).json({ message: "Sample data inserted successfully!" });
  
    } catch (error) {
      console.error("Error inserting sample data:", error);
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  });
  

module.exports = router;
