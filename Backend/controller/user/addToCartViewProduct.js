const addToCartModel = require("../../models/addToCartModel");

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProduct = await addToCartModel.find({ userId: currentUser }).populate("product_Id");
    res.json({
      data: allProduct,
      message: "all product",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProduct;
