const express = require("express");
const DocUploads = require("../models/docUpload");
const { authRequired } = require("../middleware/auth");
const fs = require("fs");
const fileType = require("file-type");
const multiparty = require("multiparty");
const AWS = require("aws-sdk");

const router = new express.Router();
const s3 = new AWS.S3();

router.post("/", authRequired, async function(req, res, next) {
  try {
    const docs = await DocUploads.upload(req.body);
    return res.status(201).json({ docs });
  } catch (err) {
    return next(err);
  }
});

router.post("/aws", async function(req, res, next) {
  const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: "public-read",
      Body: buffer,
      Bucket: process.env.S3_BUCKET,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };

  const form = new multiparty.Form();
  console.log("GETTING TO THE ROUTE");
  form.parse(req, async (error, fields, files) => {
    console.log("REQUEST", req);
    if (error) {
      throw new Error(error);
    }
    try {
      console.log("GETTING TO THE TRY");
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return res.status(200).send(data);
    } catch (err) {
      console.log("ERROR IN ROUTE");
      return next(err);
    }
  });
});

module.exports = router;
