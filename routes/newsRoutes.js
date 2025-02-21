const express = require("express");
const router = express.Router();
const { fetchAndStoreNews, saveArticles, getNewsByCategoryAndLocation } = require("../controllers/newsController");

// 🔹 Fetch & Store News (Upsert)
router.get("/fetch-news", fetchAndStoreNews);

// 🔹 Save Only New Articles (No Updates)
router.post("/save-news", saveArticles);

// 🔹 Get News by Category & Location
router.get("/news", getNewsByCategoryAndLocation);

module.exports = router;
