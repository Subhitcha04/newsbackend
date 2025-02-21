const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwtUtils");

exports.register = async (req, res) => {
  const { full_name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      full_name,
      email,
      password: hashedPassword, // Store hashed password
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
      token: generateToken(user._id), // Use user ID for token generation
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
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

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
