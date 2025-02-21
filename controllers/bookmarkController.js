const Bookmark = require("../models/Bookmark");

exports.addBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.create(req.body);
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user_id: req.params.user_id });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
