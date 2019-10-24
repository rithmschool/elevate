const express = require("express");
const DocUploads = require("../models/docUpload");
const { authRequired } = require("../middleware/auth");
const fs = require("fs");
// const fileType = require("file-type");
// const multiparty = require("multiparty");
const AWS = require("aws-sdk");

const router = new express.Router();
const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

router.post("/", authRequired, async function(req, res, next) {
  try {
    const docs = await DocUploads.upload(req.body);
    return res.status(201).json({ docs });
  } catch (err) {
    return next(err);
  }
});

router.post("/aws", async function(req) {
  console.log("REQ BODY", req.body);
  const uploadFile = file => {
    console.log("WHHHAT IS HAPPENING");
    const fileContent = fs.readFileSync(file);
    const params = {
      Bucket: "brellacontracts",
      Key: file.name,
      Body: fileContent
    };

    s3.upload(params, function(err, data) {
      if (err) {
        console.log("error");
      }
      console.log("file uploaded successfully at:", data.Location);
    });
  };

  uploadFile(req.body);

  // const form = new multiparty.Form();
  // console.log("GETTING TO THE ROUTE");

  // form.parse(req, async (error, fields, files) => {
  //   console.log("REQUEST", req);
  //   if (error) {
  //     throw new Error(error);
  //   }
  //   try {
  //     console.log("GETTING TO THE TRY");
  //     const path = files.file[0].path;
  //     const buffer = fs.readFileSync(path);
  //     const type = fileType(buffer);
  //     const timestamp = Date.now().toString();
  //     const fileName = `bucketFolder/${timestamp}-lg`;
  //     const data = await uploadFile(buffer, fileName, type);
  //     return res.status(200).send(data);
  //   } catch (err) {
  //     console.log("ERROR IN ROUTE");
  //     return next(err);
  //   }
  // });
});

module.exports = router;
