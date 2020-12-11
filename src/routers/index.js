const express = require("express");
const router = express.Router();
const {
  home,
  activities,
  // getImage,
  convertImage,
  downloadAsPDf,
  downloadAsDoc,
  downloadAsTxt,
  deleteSingleImage,
  deleteAllImage,
  about,
} = require("../controllers/index");
const { upload } = require("../configs/multer");

router.get("/", home);

router.post("/", upload.array("image_upload", 10), activities);
router.get("/about", about);
router.get("/image/:id", convertImage);
router.delete("/image/:id", deleteSingleImage);
router.get("/downloadPdf", downloadAsPDf);
router.get("/downloadDoc", downloadAsDoc);
router.get("/downloadTxt", downloadAsTxt);
module.exports = router;
