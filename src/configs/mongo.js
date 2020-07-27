const mongoose = require("mongoose");

function mongodb() {
  const uri = "mongodb://localhost:27017/image_recognition";

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (done) {
      console.log("MongoDB Connected");
    })
    .catch(function (err) {
      throw new Error(err);
    });
}
module.exports = {
  mongodb,
};
