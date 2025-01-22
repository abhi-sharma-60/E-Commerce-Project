const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userDetailsController(req, res) {
  try {
    
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
