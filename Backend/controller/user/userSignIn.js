const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
        error: true,
      });
    }

    // Generate JWT token
    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "8h",
    });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true for HTTPS
      sameSite: "None", // important for cross-site cookies
      maxAge: 1000 * 60 * 60 * 8, // 8 hours in ms
    });

    // Send success response
    res.status(200).json({
      message: "Login successful",
      data: token,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
}

module.exports = userSignInController;
