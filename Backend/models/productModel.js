const mongoose = require("mongoose");

// Define the schema for the user model
const productSchema = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
  },
  {
    timestamps: true,
  }
);

// Create the model from the schema
const productModel = mongoose.model("Product", productSchema); // Capitalized name for the model

module.exports = productModel;
