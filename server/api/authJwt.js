const jwt = require("jsonwebtoken");
const config = require("config");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.get("SECRET"), (err) => {
    if (err) {
      res.clearCookie("accessToken");
    }
  });

  next();
};

module.exports = verifyToken;
