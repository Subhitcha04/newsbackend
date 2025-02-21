const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user profile (Protected Route)
router.get("/", (req, res) => {
    res.status(200).json({ message: "User route working!" });
});


module.exports = router;
