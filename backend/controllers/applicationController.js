const express = require("express");
const Application = require("../models/Application");

// Create a new application
const createApplication = async (req, res) => {
  try {
    const { userId, formId, formData } = req.body;
    const newApplication = new Application({ userId, formId, formData });
    await newApplication.save();
    res
      .status(201)
      .json({ message: "Application Creared Successfully", newApplication });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing application
const updateApplication = async (req, res) => {
  try {
    const { userId, formId, formData } = req.body;
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { userId, formId, formData },
      { new: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(updatedApplication);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id
    );
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
