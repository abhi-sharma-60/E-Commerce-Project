const productModel = require("../../models/productModel");

const getProductDtails = async (req, res) => {
  try {
    const {productId} = req.body;

    const product = await productModel.findById(productId);

    res.json({
      message: "OK",
      data: product,
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
};

module.exports = getProductDtails;
