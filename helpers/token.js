const jwt = require("jsonwebtoken");

module.exports.generateSessionToken = (userData, key) => {
    return jwt.sign(
        { id: userData.id, username: userData.username, email: userData.email },
        key,
        {
          expiresIn: "2h",
        }
    ); 
}