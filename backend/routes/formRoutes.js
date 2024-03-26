const express = require("express");
const { createForm, getAllForms } = require("../controllers/formController");
const authorize = require("./../middlewares/authorize");
const router = express.Router();

router.post("/", authorize("admin"), createForm);
router.get("/", getAllForms);

module.exports = router;
