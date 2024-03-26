const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is allowed or if it's a same-origin request
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost:")
      ) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Deny the request
      }
    },
    credentials: true, // Allow credentials like cookies, authorization headers, etc.
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/applications", applicationRoutes);

// Error handling middleware (must be added after route handlers)
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
