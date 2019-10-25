const express = require("express");
const DocUploads = require("../models/docUpload");
const { authRequired } = require("../middleware/auth");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const router = express.Router();

// AWS.config.update({
//   accessKeyId: "AKIAJWE6CEC65SITEYJQ",
//   secretAccessKey: "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"
// });

const ID = "AKIAJWE6CEC65SITEYJQ";
const SECRET = "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";

// const s3 = new AWS.S3();
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

router.post("/", authRequired, async function(req, res, next) {
  try {
    const docs = await DocUploads.upload(req.body);
    return res.status(201).json({ docs });
  } catch (err) {
    return next(err);
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "brellacontracts",
    key: function(req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
});

router.post("/aws", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);

  // const fileContent = fs.readFileSync(file);
  // const params = {
  //   Bucket: "brellacontracts",
  //   Key: file.name,
  //   Body: fileContent
  // };

  // s3.upload(params, function(err, data) {
  //   if (err) {
  //     console.log("error");
  //   }
  //   console.log("file uploaded successfully at:", data.Location);
  // });
  // uploadFile(req.body);
});

module.exports = router;
