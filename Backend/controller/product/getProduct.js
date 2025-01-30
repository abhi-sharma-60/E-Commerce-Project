const uploadProductPermission = require("../../helpers/permisson");
const productModel = require("../../models/productModel");

async function getProductController(req, res) {
  try {
    const allProduct = await productModel.find().sort({ createAt: -1 });
    res.status(201).json({
      message: "All Product",
      error: false,
      success: true,
      data: allProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = getProductController;
