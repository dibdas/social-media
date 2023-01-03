const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    unique: true,
    required: true,
    type: String,
    // even if the user provides the email input as uppercase , it will be saved in the database as lowercase
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
