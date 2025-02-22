const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwtUtils");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// ✅ User Registration
exports.register = asyncHandler(async (req, res) => {
  let { full_name, email, password } = req.body;

  // Trim inputs
  full_name = full_name.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  // Validate required fields
  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password strength
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.",
    });
  }

  // Check if the user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  // ✅ Create a new user (no manual password hashing here)
  user = new User({
    full_name,
    email,
    password, // The User model will handle hashing automatically
  });

  await user.save();

  // Return token & user info
  res.status(201).json({
    message: "Registration successful",
    user: {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
    },
    token: generateToken(user._id),
  });
});

// ✅ User Login
exports.login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  // Trim inputs
  email = email.trim().toLowerCase();
  password = password.trim();

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Debugging logs
  console.log("Entered Email:", email);
  console.log("Stored Email:", user.email);
  console.log("Entered Password:", password);
  console.log("Stored Hashed Password:", user.password);

  // ✅ Verify the password using bcrypt.compare
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password Match Result:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Return token & user info
  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
    },
    token: generateToken(user._id),
  });
});

// ✅ Validate User Data (Middleware)
exports.validateUser = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
