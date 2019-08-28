/** Routes for users. */

const express = require('express');
const { ensureCorrectUser } = require('../middleware/auth');
const Question = require('../models/question');
const createToken = require('../createToken');
const User = require('../models/user');

const router = express.Router();

router.post('/', ensureCorrectUser, async function (req, res, next) {
  try {
    // If no user, create one: 
    if (req.body._token === null) {
      const newUser = await User.register(req.body);
      const token = createToken(newUser);
      await Question.create(req.body.question, newUser.id);
    }
    // If user is logged in:
    console.log(req.body)
    await Question.create(req.body.question);

    // If user exists but is not logged in:

    // Do this after all logic
    return res.status(201).json({ token });

  } catch (err) {
    return next(err);
  }

})

module.exports = router;