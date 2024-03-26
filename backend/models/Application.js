const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  formData: {
    type: mongoose.Schema.Types.Mixed, // You can define specific fields here based on the selected form
    required: true,
  },
  // Other application-related fields
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
