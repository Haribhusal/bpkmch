const Form = require("../models/Form");
const { validationResult } = require("express-validator");

// Create a new form
const createForm = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      formFee,
      registrationNumber,
      registeredDate,
      rollNumber,
      examDate,
      examCenter,
      advertisementNumber,
      khullaOrAaPra,
      designation,
      service,
      group,
      subGroup,
      stage,
      formType,
    } = req.body;

    console.log(req.body);

    // Create a new form instance
    const form = new Form({
      formFee,
      registrationNumber,
      registeredDate,
      rollNumber,
      examDate,
      examCenter,
      advertisementNumber,
      khullaOrAaPra,
      designation,
      service,
      group,
      subGroup,
      stage,
      formType,
    });

    // Save the form to the database
    await form.save();

    res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ forms });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get form by ID
const getFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ form });
  } catch (error) {
    console.error("Error fetching form by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update form by ID
const updateFormById = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const formId = req.params.id;
    const updatedFields = req.body;
    const updatedForm = await Form.findByIdAndUpdate(formId, updatedFields, {
      new: true,
    });
    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form updated successfully", updatedForm });
  } catch (error) {
    console.error("Error updating form by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete form by ID
const deleteFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const deletedForm = await Form.findByIdAndDelete(formId);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully", deletedForm });
  } catch (error) {
    console.error("Error deleting form by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createForm,
  getAllForms,
  getFormById,
  updateFormById,
  deleteFormById,
};
