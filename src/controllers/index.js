const fs = require("fs");
const Convert = require("../models/Convert");
const OCR = require("ocr-space-api-wrapper");
const { Document, Packer, Paragraph, TextRun } = require("docx");
const pdf = require("pdfkit");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.home = async (req, res) => {
  try {
    const data = await Convert.find().sort({ data: -1 });
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

    const options = {
      apiKey: "c454cc712088957",
      // filetype: "jpg",
      verbose: true,
      OCREngine: 2,
    };
    const text = await OCR(image, options);
    const ocredResult = text.ParsedResults[0].ParsedText;

    // Write to DOCX
    const doc = new Document();
    doc.addSection({
      properties: {},
      children: [new Paragraph(ocredResult)],
    });
    // Used to export the file into a .docx file
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(`${__dirname}/../../pdf/result.docx`, buffer);
    });

    // Write To PDF using PDFKIT
    const PDFDoc = new pdf();

    PDFDoc.pipe(fs.createWriteStream(`${__dirname}/../../pdf/result.pdf`));
    PDFDoc.text(ocredResult);
    PDFDoc.end();

    // write to TEXT
    fs.writeSync(`${__dirname}/../../pdf/result.txt`, ocredResult);
    res.json({
      statusCode: 201,
      message: "Recognition completed! wait for auto download 😎",
    });
  } catch (err) {
    res.json({
      statusCode: 500,
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

async function progressBar(progress) {
  console.log(progress);
}
exports.downloadAsPDf = async (req, res) => {
  const pdfFile = `${__dirname}/../../pdf/result.pdf`;
  res.download(pdfFile);
};

exports.downloadAsTxt = async (req, res) => {
  const txtFile = `${__dirname}/../../pdf/result.txt`;
  res.download(txtFile);
};
exports.downloadAsDoc = async (req, res) => {
  const docFile = `${__dirname}/../../pdf/result.docx`;
  res.download(docFile);
};
