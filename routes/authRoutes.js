const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// ✅ User Authentication Routes
router.post("/register", register);
router.post("/login", login);

// ✅ GET Route to verify Register API
router.get("/register", (req, res) => {
  res.status(200).json({ message: "Register API is active" });
});

// ✅ GET Route to verify Login API
router.get("/login", (req, res) => {
  res.status(200).json({ message: "Login API is active" });
});

// ✅ Add a GET route to check authentication API is working
router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth API is working" });
});

module.exports = router;
