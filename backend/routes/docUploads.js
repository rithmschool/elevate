const express = require("express");
const DocUploads = require("../models/docUpload");
const { authRequired } = require("../middleware/auth");

const router = new express.Router();

router.post("/", authRequired, async function(req, res, next) {
  try {
    const docs = await DocUploads.upload(req.body);
    return res.status(201).json({ docs });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
