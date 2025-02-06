const addToCartModel = require("../../models/addToCartModel");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const addToCartProductId = req.body._id;
    const deleteProduct = await addToCartModel.deleteOne(
      {
        _id: addToCartProductId,
      }
    );
    res.json({
      data: deleteProduct,
      message: "Product deleted from cart",
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

module.exports = deleteAddToCartProduct;
