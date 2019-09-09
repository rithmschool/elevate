const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const router = express.Router();
const crypto = require("crypto");
const resetPasswordTemplate = require("../helpers/resetPasswordTemplate");
const {EMAIL_ADDRESS, EMAIL_PASSWORD, FROM_EMAIL, SERVICE, EXPIRE_TIME} = require("../config");


/** POST / check if email address exist in database and send password reset link to user email */

router.post('/', async function (req, res, next) {
  let user ;
  const email = req.body.email

    try {
      user = await User.findUserbyEmail(email);
    }
    catch (err) {
      return next(err);
    }
      /**  Generate a token using crypto Node.js built in module
       *   Generate an expire time string usong Date.now() module */ 
      const token = crypto.randomBytes(20).toString('hex');
      let data = {
        reset_password_token: token,
        reset_password_expires: Date.now() + EXPIRE_TIME,
      }

      // update our database with this new token and expire time
      await User.update(user.id, data);

      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: `${SERVICE}`,
        auth: {
          user: `${EMAIL_ADDRESS}`,
          pass: `${EMAIL_PASSWORD}`,
        },
      });

      // Create Mail Options
      const mailOption = {
        from: `${FROM_EMAIL}`,
        to: `${user.email}`,
        subject: `Link to reset password`,
        html: resetPasswordTemplate(user.first_name, token)
      };

      // Send mail to the user  with a link to reset the password
      transporter.sendMail(mailOption, function(err, response){
        if(err){
          return(err)
        }
        else {
          return res.json({ message: 'Recovery email sent!'});
        }
      })    
});

/** GET / Verify in the database if the token is valid and not expired yet
 *        return {id, first_name}
  */
router.get('/:token', async function (req, res, next) {
  
  const resetPasswordToken = req.params.token;
  try {
    const user = await User.verifyPasswordToken(resetPasswordToken);
    return res.json({ 
      id: user.id, 
      first_name: user.first_name,
    });
  }
  catch (err) {
    return next(err);
  }
});

/** PATCH / {password} => {user} */
router.patch('/:id', async function (req, res, next) {
  
  try {
    const {resetPasswordToken , password} = req.body;

    const user = await User.verifyPasswordToken(resetPasswordToken);
    if(user){
      const response = await User.update(req.params.id, {password});
      if (response) {
        return res.json({ response });
      }
    }
  }
  catch (err) {
    return next(err);
  }
});
module.exports = router;