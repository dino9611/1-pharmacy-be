const jwt = require("jsonwebtoken");

module.exports.generateSessionToken = (data, key) => {
  return jwt.sign(
    { id: data.id, username: data.username, email: data.email },
    key,
    { expiresIn: "2h" }
  );
}

module.exports.generateForgotPasswordToken = (data, key) => {
  return jwt.sign(
    { id: data.id },
    key,
    { expiresIn: "1h" }
  );
}