const express = require("express");
const router = new express.Router();
const DocUploads = require("../models/docUpload");
const { authRequired } = require("../middleware/auth");

router.post("/db", authRequired, async function(req, res, next) {
  try {
    const docs = await DocUploads.add(req.body);
    return res.status(201).json({ docs });
  } catch (err) {
    return next(err);
  }
});

var multer = require("multer");
var multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;

// The name of the bucket that you have created
const BUCKET_NAME = process.env.S3_BUCKET;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: "private",
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

router.post("/", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

module.exports = router;
