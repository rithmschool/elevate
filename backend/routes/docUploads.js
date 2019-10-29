const express = require("express");
const router = new express.Router();
const DocUploads = require("../models/docUpload");
const { authRequired } = require("../middleware/auth");
// const AWS = require("aws-sdk");
// const fs = require("fs");
// const path = require("path");

// router.post("/", authRequired, async function(req, res, next) {
//   try {
//     const docs = await DocUploads.upload(req.body);
//     return res.status(201).json({ docs });
//   } catch (err) {
//     return next(err);
//   }
// });

var multer = require('multer');
var multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// Enter copied or downloaded access ID and secret key here
const ID = '';
const SECRET = '';

// The name of the bucket that you have created
const BUCKET_NAME = 'brellacontracts';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      key: function (req, file, cb) {
          console.log(file);
          cb(null, file.originalname); //use Date.now() for unique file keys
      }
  })
});

router.post('/', upload.single('file'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file);
});

// router.post("/aws", function(req, res, next) {
  // console.log("REQ BODY", req.body);
  // try {
  //   AWS.config.update({
  //     accessKeyId: ID,
  //     secretAccessKey: SECRET
  //   });

  //   const s3 = new AWS.S3();
  //   let params = {
  //     Bucket: "brellacontracts",
  //     Body: fs.createReadStream(req.body.filePath),
  //     Key: "folder/" + Date.now() + "_" + path.basename(req.body.filePath)
  //   };

  //   let response;
  //   s3.upload(params, function(err, data) {
  //     if (data) {
  //       response = { message: `Uploaded in ${data.Location}` };
  //       return res.json(response);
  //     } else {
  //       next();
  //     }
  //   });
//   } catch (err) {
//     console.log("ERROR");
//   }
// });

module.exports = router;
