const { OAuth2Client } = require("google-auth-library");
const userModel = require("../../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "Google token is required" });
  }

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name} = payload;
    //console.log(email)

    // Check if the user already exists; if not, create one
    let user = await userModel.findOne({ email });
    if (!user) {
      const userData = new userModel(payload);
      user = await userData.save();
    }

    const tokenData = {
            _id: user._id,
            email: user.email,
          };
          const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY, {
            expiresIn: 60 * 60 * 8,
          });
          const tokenOption = {
            httpOnly: true,
            secure: true,
          };
          res.cookie("token", token,tokenOption).status(200).json({
            message: "Login Successfully",
            data: token,
            success: true,
            error: false,
          });



  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return res.status(400).json({ message: "Invalid Google token" });
  }
};

module.exports = googleLogin;

