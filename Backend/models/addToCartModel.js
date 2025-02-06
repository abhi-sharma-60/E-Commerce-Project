const mongoose = require("mongoose");

// Define the schema for the user model
const addToCart = new mongoose.Schema(
  {
    productId : String,
    quantity : Number,
    userId : String,

  },
  {
    timestamps: true,
  }
);

// Create the model from the schema
const addToCartModel = mongoose.model("addToCart", addToCart); // Capitalized name for the model

module.exports = addToCartModel;
