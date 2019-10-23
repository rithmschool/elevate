// Endpoints for documents

const Document = require("../models/document");
const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");

const router = express.Router();

// GET--- endpoint for getting all documents
router.get("/manage", ensureCorrectUser, async function(req, res, next) {
  
  try {
    let documents = await Document.getAll(req.user_id);
    return res.json({ documents });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
