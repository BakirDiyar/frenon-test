const jwt = require("jsonwebtoken");
const { secret } = require("../environments/env");

async function auth(req, res, next) {
  let token = req.get("Authorization");

  if (token) {
    token = token.split(" ")[1].trim();

    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return res.send({
          status: false,
          message: "Acceso denegado",
          data: {},
        });
      }

      let user = decode.user
      delete user.password
      req.user = user;
      next();
    });
  } else {
    return res.send({
      status: false,
      message: "Debe proveer un token valido",
      data: {},
    });
  }
}

module.exports = auth;
