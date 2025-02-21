const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  article_id: { type: mongoose.Schema.Types.ObjectId, ref: "NewsArticle", required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
