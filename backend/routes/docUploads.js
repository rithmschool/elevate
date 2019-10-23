const express = require("express");
const DocUploads = require("../models/docUpload");
const { authRequired } = require("../middleware/auth");
const fs = require("fs");
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = fileData => {
  const { name } = fileData;
  console.log("sfdasdfasdfjkafkjashdfkahsf", fileData);
  fs.readFile(name, (err, data) => {
    console.log("this is route file", data);
    if (err) {
      throw err;
    }
    const params = {
      Bucket: "brellacontracts", // pass your bucket name
      Key: name, // file will be saved as testBucket/contacts.csv
      Body: JSON.stringify(data, null, 2)
    };
    s3.upload(params, function(s3Err, data) {
      if (s3Err) {
        throw s3Err;
      }
      console.log(`File uploaded successfully at ${data.Location}`);
    });
  });
};

const router = new express.Router();

router.post("/db", authRequired, async function(req, res, next) {
  try {
    console.log("this is a req.body that works:", req.body);
    const docs = await DocUploads.upload(req.body);
    return res.status(201).json({ docs });
  } catch (err) {
    return next(err);
  }
});

router.post("/", authRequired, async function(req, res, next) {
  try {
    console.log("backend req", req.body);
    const docs = uploadFile(req.body);
    return res.status(201).json({ docs });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
