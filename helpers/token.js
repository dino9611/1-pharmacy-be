const jwt = require("jsonwebtoken");

module.exports.generateSessionToken = (user, key) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin },
    key,
    { expiresIn: "2h" }
  );
}

module.exports.generateForgotPasswordToken = (user, key) => {
  return jwt.sign(
    { id: user.id },
    key,
    { expiresIn: "1h" }
  );
}