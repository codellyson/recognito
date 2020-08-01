const fs = require("fs");
const Convert = require("../models/Convert");
const { createWorker } = require("tesseract.js");
const worker = createWorker({
  logger: (m) => progressBar(m),
});
exports.home = async (req, res) => {
  try {
    const data = await Convert.find();
    const result = data.map((res) => {
      return res;
    });
    console.log();
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
exports.recognizePage = async (req, res) => {
  try {
    const data = await Convert.find();
    const result = data.map((res) => {
      return res;
    });
    console.log();
    res.render("./../src/views/recognize.hbs", {
      title: "Recognize",
      result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};
exports.about = async (req, res) => {
  res.render("./../src/views/about.hbs", {
    title: "About page",
  });
};
exports.activities = async (req, res) => {
  try {
    const images = req.files;
    let result = "";
    images.forEach(async (image) => {
      const newImage = new Convert({
        image: image.path,
      });
      result = await newImage.save();
    });
    res.json({
      result,
      message: "Uploaded successfully,please wait for auto reload!😎 ",
    });
  } catch (err) {
    res.json({
      message: "An error occured! try again",
    });
  }
};

exports.convertImage = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Convert.findById(id);
    const image = result.image;
    await recognizeImage(image);
    res.json({
      // result: "Recognition completed! wait for auto download 😎",
    });
  } catch (err) {
    res.json({
      message: "An error occured, try again!",
    });
  }
};

exports.deleteSingleImage = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Convert.findByIdAndDelete(id);

    fs.unlinkSync(result.image);
    res.json({
      result,
      message: "Task removed successfully!",
    });
  } catch (err) {
    res.json({
      message: "An error occured! try again",
    });
  }
};
// exports.deleteAllImage = async (req, res) => {
//   try {
//     const result = await Convert.deleteMany();
//     console.log(result);
//     result.forEach((res) => {
//       fs.unlinkSync(res.image);
//     });
//     res.json({
//       result,
//       message: "Tasks removed successfully",
//     });
//   } catch (err) {
//     res.json({
//       message: "An error occured, try again!",
//     });
//   }
// };

async function recognizeImage(image) {
  try {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(image);
    await worker.terminate();
    const { data } = await worker.getPDF("Tessercat OCR Result");
    fs.writeFileSync("./pdf/result.pdf", Buffer.from(data));

    return text;
  } catch (err) {
    res.json({
      message: "An error occured, try again!",
    });
  }
}

async function progressBar(progress) {
  console.log(progress);
}
exports.downloadAsPDf = async (req, res) => {
  const pdfFile = `${__dirname}/../../pdf/result.pdf`;
  res.download(pdfFile);
};
