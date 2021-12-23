const jwt = require("jsonwebtoken");

module.exports.generateSessionToken = (user, key) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    key,
    { expiresIn: "2h" }
  );
}

module.exports.generateEmailVerificationToken = (user, key) => {
  return jwt.sign(
    { id: user.id },
    key,
    { expiresIn: "15m" }
  );
}

module.exports.generateForgotPasswordToken = (user, key) => {
  return jwt.sign(
    { id: user.id },
    key,
    { expiresIn: "1h" }
  );
}