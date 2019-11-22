const Admin = require("../models/admin");
const express = require("express");
const router = new express.Router();
const { adminRequired } = require("../middleware/auth");

router.get("/documents", adminRequired, async function(req, res, next) {
  try {
    let documents = await Admin.getAllDocuments();
    return res.json({ documents });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
