const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();
const crypto = require('crypto');
const resetPasswordTemplate = require("../helpers/resetPasswordTemplate");
const {EMAIL_ADDRESS, EMAIL_PASSWORD, SERVICE} = require("../config");


/** POST / check if email address exist in database and send password reset email */

router.post('/', async function (req, res, next) {
  let user = null;
  const email = req.body.email

    try {
      user = await User.findUserbyEmail(email);
    }
    catch (err) {
      return next(err);
    }
    
      const token = crypto.randomBytes(20).toString('hex');
      let data = {
        reset_password_token: token,
        reset_password_expires: Date.now() + 360000,
      }
      User.update(user.id, data);

      const transporter = nodemailer.createTransport({
        service: `${SERVICE}`,
        auth: {
          user: `${EMAIL_ADDRESS}`,
          pass: `${EMAIL_PASSWORD}`,
        },
      });
      const mailOption = {
        from: `superAgent@gmail.com`,
        to: `${user.email}`,
        subject: `Link to reset password`,
        html: resetPasswordTemplate(user.first_name, token)
      };
      transporter.sendMail(mailOption, function(err, response){
        if(err){
          console.log("there was an error: ", err);
          return(err)
        }
        else {
          console.log('here is the res:', response);
          return res.json('Recovery email sent!');
        }
      })
     
});


router.get('/:token', async function (req, res, next) {
  
  const resetPasswordToken = req.params.token;
  try {
    const user = await User.verifyPasswordToken(resetPasswordToken);
    return res.json({ id: user.id, first_name: user.first_name });
  }
  catch (err) {
    return next(err);
  }

});


router.patch('/', async function (req, res, next) {
  
  const id = req.body.id;
  const password = req.body.password;
  const data = {password};
  try {
    const user = await User.update(id, data);
    return res.json({ user });
  }
  catch (err) {
    return next(err);
  }

});
module.exports = router;