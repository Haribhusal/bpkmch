const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  formFee: {
    type: Number,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  examDate: {
    type: Date,
    required: true,
  },
  examCenter: {
    type: String,
    required: true,
  },
  advertisementNumber: {
    type: String,
    required: true,
  },
  khullaOrAaPra: {
    type: String,
    enum: ["Khulla", "AaPra"],
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  subGroup: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  formType: {
    type: String,
    enum: [
      "Khulla",
      "Mahila",
      "Janajati",
      "Madhesi",
      "Dalit",
      "Apanga",
      "Pichhadiyeko",
    ],
    required: true,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
