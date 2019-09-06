/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const createToken = require("../helpers/createToken");
const {
  authRequired,
  adminRequired,
  ensureCorrectUser
} = require("../middleware/auth");

// Google API Client Libraries used to verify goole token (id_token)
const {OAuth2Client} = require('google-auth-library');
/**  CLIENT_ID from created a Google API Console project from
 *    https://developers.google.com/identity/sign-in/web/sign-in
*/
const CLIENT_ID = '98215850405-9u3oli17i7vko2f22k6rc7f9srlpjf3m.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


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

<<<<<<< HEAD


/**Validate Google ID token using Google API Client Libraries
 * need to ==> npm install google-auth-library --save
*/

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  return payload
  

}
router.post("/ggtokensignin", async function(req,res,next) {
  try {
    const ggToken = req.body.token
    let payload = await verify(ggToken)
    const user = await User.googleLogin(payload)
    const token = createToken(user)
    return res.json({ token });
  }
  catch (error){
    return next(error)
  }
})



=======
// TODO: FIX THIS - TAKE OUT ALL THESE ROUTES AND WRITE BETTER TESTS
>>>>>>> master

/**FAKE ROUTE!!! to test authRequired middleware */
router.get("/test", authRequired, function(req, res, next) {
  try {
    return res.send("hello");
  } catch (err) {
    return next(err);
  }
});

/**FAKE ROUTE!!! to test adminRequired middleware */
router.get("/admin_test", adminRequired, function(req, res, next) {
  try {
    return res.send("hello admin");
  } catch (err) {
    return next(err);
  }
});

/**FAKE ROUTE!!! to test ensureCorrectUser middleware */
router.get("/:id", ensureCorrectUser, function(req, res, next) {
  try {
    return res.send("hello ensure correct user");
  } catch (err) {
    return next(err);
  }
});

<<<<<<< HEAD


module.exports = router;
=======
module.exports = router;
>>>>>>> master
