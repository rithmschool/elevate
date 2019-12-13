/** Routes for users. */
const express = require("express");
const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const User = require("../models/user");
const createToken = require("../helpers/createToken");
const { signupFormValidator } = require("../helpers/formValidation");
const router = express.Router();

/** GET / => {users: [user, ...]} */

router.get("/", authRequired, async function(req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET / a specific user => {user: user} */

router.get("/:id", authRequired, ensureCorrectUser, async function(req, res, next) {
  try {
    const user = await User.findOne(req.params.id);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** POST / a new user {email, password}  => {token: token} */

router.post("/", signupFormValidator, async function(req, res, next) {
  try {
    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

/** PATCH / a specific user {userData} => {user: updatedUser} */

router.patch("/:id", ensureCorrectUser, async function(req, res, next) {
  try {
    const user = await User.update(req.params.id, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /  =>  {message: "User deleted"}  */

router.delete("/:id", ensureCorrectUser, async function(req, res, next) {
  try {
    await User.remove(req.params.id);
    return res.json({ message: "User deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
