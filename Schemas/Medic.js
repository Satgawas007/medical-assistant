// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const MedicSchema = new Schema(
  {
    type: String,
    medicine: String,
    measurement: String,
    events: String
  },
  {
    timestamps: true
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Medic", MedicSchema);