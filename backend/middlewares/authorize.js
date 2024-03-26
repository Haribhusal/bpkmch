const jwt = require("jsonwebtoken");
const { ResponseError } = require("../utils/errors");

function authorize(role) {
  console.log(role);
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new ResponseError(401, "Unauthorized");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(new ResponseError(403, "Invalid token here"));
      }

      if (user.user.role !== role) {
        return next(new ResponseError(403, "Forbidden"));
      }

      req.user = user.user;
      next();
    });
  };
}

module.exports = authorize;
