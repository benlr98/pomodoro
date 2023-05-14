import mongoose from "mongoose";

// Define a schema for a user document
const userSchema = new mongoose.Schema({
  name: String
});

// Define a model for the user schema
const User = mongoose.model("User", userSchema);

export default User;

