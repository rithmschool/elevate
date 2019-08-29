/** Routes for users. */

const express = require('express');
const { authRequired } = require('../middleware/auth');
const Question = require('../models/question');
const createToken = require('../createToken');
const User = require('../models/user');

const router = express.Router();

router.post('/', authRequired, async function (req, res, next) {
  try {
    await Question.create(req.body.question, req.user_id);
    return res.json({})
  } catch (err) {
    return next(err);
  }

})

module.exports = router;