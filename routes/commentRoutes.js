const express = require("express");
const { addComment, getComments } = require("../controllers/commentController");
const router = express.Router();

router.post("/", addComment);
router.get("/:article_id", getComments);

module.exports = router;
