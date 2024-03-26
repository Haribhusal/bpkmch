const jwt = require("jsonwebtoken");
const { ResponseError } = require("../utils/errors");
const { generateAccessToken } = require("../utils/auth");

function checkTokenExpiration(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new ResponseError(401, "Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = req.headers["refresh-token"];
        if (!refreshToken) {
          throw new ResponseError(401, "Refresh token not provided");
        }

        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, decodedRefreshToken) => {
            if (err) {
              throw new ResponseError(403, "Invalid refresh token");
            }

            // Generate new access token and attach it to the request
            const newAccessToken = generateAccessToken(
              decodedRefreshToken.userId
            );
            req.headers["authorization"] = `Bearer ${newAccessToken}`;
            next();
          }
        );
      } else {
        throw new ResponseError(403, "Invalid token");
      }
    } else {
      req.user = decodedToken;
      next();
    }
  });
}

module.exports = checkTokenExpiration;
