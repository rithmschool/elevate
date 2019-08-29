/** Routes for questions. */

const express = require('express');
const { ensureCorrectUser, authRequired } = require('../middleware/auth');
const Question = require('../models/question');

const router = express.Router();

/** GET / => {questions: [questions , ...]} */

router.get('/', authRequired, async function (req, res, next) {
  try {
    const questions = await Question.findAll();
    console.log("questions", questions)
    return res.json({ questions });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;