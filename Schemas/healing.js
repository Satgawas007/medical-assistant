
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const HealingSchema = new Schema(
  {   
    planName: String,
    typeAndDesc: String,
    onDate: String,
    addEmail: String,
    updateEmail: String   
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Healing", HealingSchema);