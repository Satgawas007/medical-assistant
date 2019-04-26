
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    email: String,
    password: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);