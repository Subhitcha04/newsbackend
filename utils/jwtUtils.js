const jwt = require("jsonwebtoken");

const generateToken = (userId, email) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }

  return jwt.sign(
    { userId, email }, 
    process.env.JWT_SECRET, 
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
