const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwtUtils");

exports.register = async (req, res) => {
  const { full_name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    user = new User({ full_name, email, password });
    await user.save();
    res.json({ token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};