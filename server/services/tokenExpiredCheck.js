const jwt = require("jsonwebtoken");
const config = require("config");

const cookieCheck = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next();
  }

  jwt.verify(token, config.get("SECRET"), (err) => {
    if (err) {
      res.clearCookie("accessToken");
    }
  });

  next();
};

module.exports = cookieCheck;
