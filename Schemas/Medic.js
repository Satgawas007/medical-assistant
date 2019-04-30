
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const MedicSchema = new Schema(
  {       
    medType: String,
    desc: String,
    addEmail: String,
    updateEmail: String    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Medic", MedicSchema);