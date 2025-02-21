const express = require("express");
const { getNotifications } = require("../controllers/notificationController");
const router = express.Router();

router.get("/:user_id", getNotifications);

module.exports = router;
