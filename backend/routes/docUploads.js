const express = require("express");
const router = new express.Router();
const DocUploads = require("../models/docUpload");
const { authRequired } = require("../middleware/auth");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const ID = "AKIAJWE6CEC65SITEYJQ";
const SECRET = "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";

router.post("/", authRequired, async function(req, res, next) {
  try {
    const docs = await DocUploads.upload(req.body);
    return res.status(201).json({ docs });
  } catch (err) {
    return next(err);
  }
});

router.post("/aws", function(req, res, next) {
  console.log("REQ BODY", req.body);
  try {
    AWS.config.update({
      accessKeyId: ID,
      secretAccessKey: SECRET
    });

    const s3 = new AWS.S3();
    let params = {
      Bucket: "brellacontracts",
      Body: fs.createReadStream(req.body.filePath),
      Key: "folder/" + Date.now() + "_" + path.basename(req.body.filePath)
    };

    let response;
    s3.upload(params, function(err, data) {
      if (data) {
        response = { message: `Uploaded in ${data.Location}` };
        return res.json(response);
      } else {
        next();
      }
    });
  } catch (err) {
    console.log("ERROR");
  }
});

module.exports = router;
