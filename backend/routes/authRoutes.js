const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyEmail,
  login,
  profile,
  refreshToken,
} = require("../controllers/authController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/profile", authenticateToken, profile);
router.post("/refresh-token", refreshToken);

module.exports = router;
