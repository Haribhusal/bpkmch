const { ResponseError } = require("../utils/errors");

function errorHandler(err, req, res, next) {
  if (err instanceof ResponseError) {
    const { status, message } = err;
    return res.status(status).json({ error: message });
  }

  console.error(err); // Log other errors to console for debugging purposes
  res.status(500).json({ error: "Internal server error" });
}

module.exports = errorHandler;
