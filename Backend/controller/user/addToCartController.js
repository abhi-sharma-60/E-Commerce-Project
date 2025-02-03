const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.find({ productId });

    if (isProductAvailable) {
      return res.json({
        message: "Already exists in add to cart",
        success: true,
        error: false,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = await addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      data: saveProduct,
      message: "Product Added",
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