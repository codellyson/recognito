const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const imageSchema = new Schema({
  image: { type: String },
});

module.exports = model("Convert", imageSchema);
