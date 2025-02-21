const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  article_id: { type: mongoose.Schema.Types.ObjectId, ref: "NewsArticle" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);
