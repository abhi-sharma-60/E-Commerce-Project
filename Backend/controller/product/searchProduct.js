const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json({
        data: [],
        message: "No search query provided",
        error: true,
        success: false,
      });
    }

    const regex = new RegExp(query, "ig");

    // console.log("Search query:", query);
    // console.log("Regex used:", regex);

    const product = await productModel.find({
      $or: [{ productName: regex }, { category: regex }],
    });

    // console.log("Search results:", product);

    res.json({
      data: product,
      message: "Search Product list",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Error in searchProduct:", err);
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
