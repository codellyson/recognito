const mongoose = require("mongoose");

async function mongodb() {
  let uri;

  if (process.env.NODE_ENV !== "production") {
    uri = "mongodb://localhost:27017/image_recognition";
  } else {
    uri = process.env.MONGO_DB_URI;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = {
  mongodb,
};
