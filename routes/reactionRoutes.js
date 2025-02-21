const express = require("express");
const { addReaction, getReactions } = require("../controllers/reactionController");
const router = express.Router();

router.post("/", addReaction);
router.get("/:article_id", getReactions);

module.exports = router;
