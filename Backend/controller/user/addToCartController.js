const addToCartModel = require("../../models/addToCartModel");
const mongoose = require("mongoose"); // Import mongoose

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.findOne({
      productId: productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Already exists in add to cart",
        success: false,
        error: true,
      });
    }

    const objectProductId = new mongoose.Types.ObjectId(productId);

    const payload = {
      productId: objectProductId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product Added To Cart",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
