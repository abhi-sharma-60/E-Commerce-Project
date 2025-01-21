const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });

    // console.log("User", user);
    if (user) {
        throw new Error("Already User Exists.");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error("Something is wrong.");
    }
    const payload = {
      ...req.body,
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = userData.save();
    res.status(201).json({
      data: saveUser,
      succss: true,
      error: false,
      message: "User Created Successfully!",
    });
  } catch (err) {
    // console.log("err", err.message);
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
