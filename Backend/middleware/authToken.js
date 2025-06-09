const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function authToken(req, res, next) {
  try {
    const token = req.cookies.token;

    // If no token is found
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Please login.",
        success: false,
        error: true,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    // Optional: You can fetch user details if needed
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found.",
        success: false,
        error: true,
      });
    }

    // Attach user to request object
    req.user = user;
    req.userId = user._id;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
      error: true,
    });
  }
}

module.exports = authToken;
