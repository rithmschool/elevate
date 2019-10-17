/** Routes for newsletter signup. */

const express = require("express");
const Newsletter = require("../models/newsletter");

const router = express.Router();

/** POST / a new newsletter signup {newSignUpData}  => {newSignUp: newSignUp} */

router.post("/", async function(req, res, next) {
  try {
    const newSignUp = await Newsletter.register(req.body);
    return res.status(201).json({ newSignUp });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
