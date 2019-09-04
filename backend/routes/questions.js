/** Routes for questions. */

const express = require('express');
const { authRequired, ensureCorrectUser } = require('../middleware/auth');
const Question = require('../models/question');
const router = express.Router();


// Create a question => Input: {req.body.question: "", req.body.email: ""}

router.post('/', async function (req, res, next) {
  try {
    await Question.create(req.body);
    return res.json({})
  } catch (err) {
    return next(err);
  }

})

/** GET / => {questions: [questions , ...]} */

router.get('/', ensureCorrectUser, async function (req, res, next) {
  try {
    const questions = await Question.findAll();
    return res.json({ questions });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;