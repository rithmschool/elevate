/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const createToken = require("../helpers/createToken");
const { authRequired, adminRequired, ensureCorrectUser } = require("../middleware/auth")

/**Log in route req.body --- { email, password } */
router.post("/", async function(req, res, next) {
  try {
   
    const user = await User.authenticate(req.body);
    
    const token = createToken(user);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

/**FAKE ROUTE!!! to test authRequired middleware */
router.get("/test", authRequired,  function (req, res, next){
  try{
    return res.send("hello")
  }
  catch(err){
    return next(err)
  }
} )

/**FAKE ROUTE!!! to test adminRequired middleware */
router.get("/admin_test",  adminRequired, function (req, res, next){
  try{
    return res.send("hello admin")
  }
  catch(err){
    return next(err)
  }
} )


/**FAKE ROUTE!!! to test ensureCorrectUser middleware */
router.get("/:id", ensureCorrectUser, function (req, res, next){
  try{
    return res.send("hello ensure correct user")
  }
  catch(err){
    return next(err)
  }
} )


module.exports = router;