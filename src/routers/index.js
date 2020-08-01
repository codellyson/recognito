const express = require("express");
const router = express.Router();
const {
  home,
  activities,
  // getImage,
  convertImage,
  downloadAsPDf,
  deleteSingleImage,
  deleteAllImage,
  about,
  recognizePage,
} = require("../controllers/index");
const { upload } = require("../configs/multer");

router.get("/", home);
router.get("/recognize", recognizePage);
router.post("/", upload.array("image_upload", 10), activities);
router.get("/about", about);
// router.delete("/image", deleteAllImage);
router.get("/image/:id", convertImage);
router.delete("/image/:id", deleteSingleImage);
router.get("/download", downloadAsPDf);
module.exports = router;
