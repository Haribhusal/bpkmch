const jwt = require("jsonwebtoken");

function authenticateToken(request, reply, done) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    reply.status(401).send({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      reply.status(403).send({ message: "Invalid token" });
      return;
    }
    request.user = user;
    done();
  });
}

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
};
