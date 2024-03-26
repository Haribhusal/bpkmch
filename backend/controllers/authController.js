const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");
const { ResponseError } = require("../utils/errors");

function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function registerUser(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ResponseError(400, "User already exists");
    }

    const verificationCode = generateVerificationCode();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        throw new ResponseError(
          500,
          "Failed to send verification code via email"
        );
      }

      const newUser = new User({
        password,
        email,
        verificationCode,
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
}

async function verifyEmail(req, res) {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email, verificationCode });
    if (!user) {
      throw new ResponseError(400, "Invalid verification code or email");
    }

    user.verified = true;
    user.verificationCode = "";
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new ResponseError(401, "Invalid credentials");
    }

    if (!user.verified) {
      throw new ResponseError(401, "Email not verified");
    }

    const accessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      userId: user._id,
      role: user.role,
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
}

async function profile(req, res) {
  const user = req.user;
  res.json({ user });
}

async function refreshToken(req, res) {
  const refreshToken = req.body.refreshToken;

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

      const newAccessToken = generateAccessToken(decodedRefreshToken.userId);
      res.json({ accessToken: newAccessToken });
    }
  );
}

module.exports = { registerUser, verifyEmail, login, profile, refreshToken };
