const express = require("express");
const { addBookmark, getBookmarks } = require("../controllers/bookmarkController");
const router = express.Router();

router.post("/", addBookmark);
router.get("/:user_id", getBookmarks);

module.exports = router;
