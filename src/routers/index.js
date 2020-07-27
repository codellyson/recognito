const express = require("express");
const router = express.Router();
const {
  home,
  activities,
  getImage,
  convertImage,
  downloadAsPDf,
} = require("../controllers/index");
const { upload } = require("../configs/multer");

router.get("/", home);
router.get("/image", getImage);
router.get("/image/:id", convertImage);
router.get("/download", downloadAsPDf);
router.post("/", upload.single("image_upload"), activities);
module.exports = router;
