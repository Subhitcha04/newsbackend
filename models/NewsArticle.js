const mongoose = require("mongoose");

const newsArticleSchema = new mongoose.Schema(
  {
    article_id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    link: { type: String, unique: true, required: true },
    description: String,
    pubDate: { type: Date, required: true },
    image_url: String,
    source_id: String,
    source_name: String,
    source_url: String,
    category: { type: [String], default: [] },  // Array for multiple categories
    country: { type: [String], default: [] },   // Array for multiple countries
    language: String,
  },
  { timestamps: true }
);

// Indexing for fast category & location searches
newsArticleSchema.index({ country: 1 }); // Index only country


const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);
module.exports = NewsArticle;
