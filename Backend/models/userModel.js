const mongoose = require("mongoose");

// Define the schema for the user model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Ensure that the user's name is provided
      trim: true, // Removes leading/trailing whitespace
    },
    email: {
      type: String,
      unique: true, // Ensures no duplicate emails in the database
      required: true, // Email is mandatory
      trim: true, // Removes leading/trailing whitespace
      lowercase: true, // Converts email to lowercase for consistency
    },
    password: {
      type: String,
      //required: true, // Password is mandatory
    },
    profilePic: {
      type: String, // URL or file path for the profile picture
      default: "", // Default value if no profile picture is provided
    },
    isGoogleUser: {
      type: Boolean,
      default: false
    },
    role: String,
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the model from the schema
const userModel = mongoose.model("User", userSchema); // Capitalized name for the model

module.exports = userModel;
