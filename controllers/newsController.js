const axios = require("axios");
const NewsArticle = require("../models/NewsArticle");

const API_KEY = "pub_67013e1ec9be58cc17b4584c1ca071d4b9ee9";
const BASE_URL = "https://newsdata.io/api/1/news";

// ✅ Fetch and Store News in Database (Upsert)
const fetchAndStoreNews = async (req, res) => {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      country: "in",
      language: "en",
      category: "business,crime,domestic,education,environment",
    });

    const response = await axios.get(`${BASE_URL}?${params.toString()}`, { timeout: 15000 });
    const articles = response.data.results || [];

    if (articles.length === 0) {
      return res.status(404).json({ error: "No news articles found." });
    }

    // ✅ Insert or update news articles in MongoDB
    const bulkOps = articles.map((article) => ({
      updateOne: {
        filter: { article_id: article.article_id },
        update: {
          $set: {
            title: article.title || "Untitled",
            link: article.link,
            description: article.description || "No description available",
            pubDate: article.pubDate ? new Date(article.pubDate) : new Date(),
            image_url: article.image_url || "",
            source_id: article.source_id || "",
            source_name: article.source_name || "",
            source_url: article.source_url || "",
            category: article.category || [],
            country: article.country || [],
            language: article.language || "unknown",
          },
        },
        upsert: true, // Ensures new articles are inserted, and existing ones are updated
      },
    }));

    if (bulkOps.length > 0) {
      await NewsArticle.bulkWrite(bulkOps);
      console.log(`✅ ${bulkOps.length} news articles saved to the database.`);
    }

    res.json({ message: "News updated successfully", count: articles.length });
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    res.status(500).json({
      error: "Failed to fetch news",
      details: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Save Only New Articles (No Updates)
const saveArticles = async (req, res) => {
  try {
    const { articles } = req.body;

    if (!articles || articles.length === 0) {
      return res.status(400).json({ error: "No articles provided." });
    }

    const filteredArticles = await Promise.all(
      articles.map(async (article) => {
        const exists = await NewsArticle.findOne({ article_id: article.article_id });
        return exists ? null : article;
      })
    );

    const newArticles = filteredArticles.filter((article) => article !== null);

    if (newArticles.length > 0) {
      await NewsArticle.insertMany(newArticles);
      console.log(`✅ ${newArticles.length} new articles saved to the database.`);
    }

    res.json({ message: "New articles saved successfully", count: newArticles.length });
  } catch (error) {
    console.error("❌ Error saving articles:", error.message);
    res.status(500).json({ error: "Error saving articles", details: error.message });
  }
};

// ✅ Get News by Category & Location
const getNewsByCategoryAndLocation = async (req, res) => {
  try {
    const { category, country } = req.query;
    const query = {};

    if (category) query.category = { $regex: new RegExp(category, "i") };
    if (country) query.country = { $regex: new RegExp(country, "i") };

    const news = await NewsArticle.find(query).sort({ pubDate: -1 }).limit(100);

    if (news.length === 0) {
      return res.status(404).json({ error: "No news articles found for the given criteria." });
    }

    res.json(news);
  } catch (error) {
    console.error("❌ Error retrieving news:", error.message);
    res.status(500).json({ error: "Error retrieving news", details: error.message });
  }
};

// ✅ Test API Connection (For Debugging Only)
const testAPI = async () => {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      country: "in",
      language: "en",
      category: "business,crime,domestic,education,environment",
    });

    const response = await axios.get(`${BASE_URL}?${params.toString()}`);
    console.log("🔍 API Test Response:", response.data);
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
  }
};

// ✅ Run test API call only if not in production
if (process.env.NODE_ENV !== "production") {
  testAPI();
}

module.exports = { fetchAndStoreNews, saveArticles, getNewsByCategoryAndLocation };
