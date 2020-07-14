const jwt = require("jsonwebtoken");
const env = require("../../environments/env");

function sign(user) {
  return jwt.sign({ user }, env.secret, { expiresIn: "2h" });
}

module.exports = sign;
