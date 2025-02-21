const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// ✅ User Authentication Routes
router.post("/register", register);
router.post("/login", login);

// ✅ Add a GET route to check authentication API is working
router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth API is working" });
});

module.exports = router;
