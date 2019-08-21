/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const createToken = require("../createToken");
const { authRequired, adminRequired, ensureCorrectUser } = require("../middleware/auth")


router.post("/login", async function(req, res, next) {
  try {
    const user = await User.authenticate(req.body);
    const token = createToken(user);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

//test auth requiredd middleware
router.get("/test", authRequired,  function (req, res, next){
  try{
    return res.send("hello")
  }
  catch(err){
    return next(err)
  }
} )

//test admin middleware
router.get("/admin_test", authRequired,  adminRequired, function (req, res, next){
  try{
    return res.send("hello admin")
  }
  catch(err){
    return next(err)
  }
} )


//test correct user middleware
router.get("/:id", authRequired, ensureCorrectUser, function (req, res, next){
  try{
    return res.send("hello ensure correct user")
  }
  catch(err){
    return next(err)
  }
} )


module.exports = router;