const jwt = require("jsonwebtoken");
const { ResponseError } = require("../utils/errors");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new ResponseError(401, "Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new ResponseError(403, "Invalid token");
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
