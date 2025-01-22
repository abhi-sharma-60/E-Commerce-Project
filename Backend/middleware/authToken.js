const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        message: "User Not Login",
        error: true,
        success: false,
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      console.log(err);
      console.log("decoded", decoded);

      if (err) {
        console.log("error auth", err);
      }
      req.user.id = decoded._id;
      next();
    });
    // console.log("token        :", token);
  } catch (err) {
    res.stauts(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
