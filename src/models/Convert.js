const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const imageSchema = new Schema({
  image: { type: String },
  date: {
    type: Date,
    default: Date.now(),
    // expires: 18000,
  },
});

module.exports = model("Convert", imageSchema);
