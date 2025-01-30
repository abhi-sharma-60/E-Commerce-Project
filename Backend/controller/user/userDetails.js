const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    // Ensure the user ID exists in the request (usually set by the auth middleware)
    if (!req.user || !req.userId) {
      throw new Error("User ID is missing. Please authenticate.");
    }
    // console.log(req.userId);
    // Fetch the user details from the database
    const user = await userModel.findById(req.userId);
    // console.log(user);
    res.status(200).json({
      data : user,
      error : false,
      success : true,
      message : "User details : "
    })

    // if (!user) {
    //   throw new Error("User not found.");
    // }

    // // Return the user details
    // res.status(200).json({
    //   data: user,
    //   message: "User details fetched successfully.",
    //   error: false,
    //   success: true,
    // });
  } catch (err) {
    // Handle errors and send an error response
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
