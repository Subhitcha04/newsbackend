const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  article_id: { type: mongoose.Schema.Types.ObjectId, ref: "NewsArticle", required: true },
  type: { type: String, enum: ["like", "love", "angry", "sad"], required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reaction", ReactionSchema);
