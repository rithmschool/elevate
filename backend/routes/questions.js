/** Routes for users. */

const express = require('express');
const { ensureCorrectUser, authRequired } = require('../middleware/auth');
const Question = require('../models/question');
const createToken = require('../createToken');

const router = express.Router();

router.post('/', async function (req, res, next) {
  try {
    const question = await Question.create(req.body);
    return res.json({ question });

  } catch (err) {
    return next(err);
  }

})

module.exports = router;