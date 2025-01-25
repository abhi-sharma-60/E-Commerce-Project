async function userLogout(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logged Out Successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
      data: [],
    });
  }
}

module.exports = userLogout;
