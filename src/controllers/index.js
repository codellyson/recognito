const fs = require("fs");
const Convert = require("../models/Convert");
const { createWorker } = require("tesseract.js");

exports.home = async (req, res) => {
  console.log(req.method + " request " + req.url);
  try {
    const data = await Convert.find();
    const result = data.map((res) => {
      return res;
    });
    res.render("./../src/views/index.hbs", {
      title: "Home",
      result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.getImage = async (req, res) => {
  try {
    const data = await Convert.find();
    const result = data.map((res) => {
      return res;
    });
    res.json({
      result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};
exports.activities = async (req, res) => {
  const newImage = new Convert({
    image: req.file.path,
  });
  const result = await newImage.save();
  res.json({ result: "Uploaded successfully" });
};
const worker = createWorker({
  logger: (m) => progressBar(m),
});
exports.convertImage = async (req, res) => {
  const id = req.params.id;
  const result = await Convert.findById(id);
  const image = result.image;
  await recognizeImage(image);
  res.json({
    result: "done",
  });
};
async function recognizeImage(image) {
  console.log(image);
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(image);

  const { data } = await worker.getPDF("Tessercat OCR Result");
  fs.writeFileSync("./pdf/result.pdf", Buffer.from(data));
  await worker.terminate();
  return text;
}
async function progressBar(progress) {
  console.log(progress);
}
exports.downloadAsPDf = async (req, res) => {
  const pdfFile = `${__dirname}/../../pdf/result.pdf`;
  res.download(pdfFile);
};
