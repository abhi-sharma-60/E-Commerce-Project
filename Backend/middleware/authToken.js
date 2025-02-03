const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies.token;
    // If no token is found, return a 401 status indicating unauthorized access.
    if (!token) {
      return res.status(401).json({
        message: "Please Login",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        // If there's an error in verifying the token, return a 401 status.
        return res.status(401).json({
          message: "Invalid Token",
          error: true,
          success: false,
        });
      }
      // Initialize req.user if undefined and set the user ID.
      if (!req.user) req.user = {};
      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    // Return a 400 status code for any server-side errors.
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
