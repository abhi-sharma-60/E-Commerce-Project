const addToCartModel = require("../../models/addToCartModel");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;
    const updateProduct = await addToCartModel.updateOne({
      addToCartProductId,
      ...(qty && { quantity: qty }),
    });
    res.json({
      data: updateProduct,
      message: "update cart",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
