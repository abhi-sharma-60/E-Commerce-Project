const uploadProductPermission = require("../helpers/permisson");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }
    const { _id, ...resBody } = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.json({
      data: updateProduct,
      message: "Product updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;
