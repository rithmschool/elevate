const express = require('express');
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
// const { ensureCorrectUser, authRequired } = require('../middleware/auth');
const User = require('../models/User');
const createToken = require('../createToken');

const router = express.Router();

/** GET / => {users: [user, ...]} */

router.post('/', async function (req, res, next) {
  if(req.body.email === ''){
    return res.json('email required');
  }
  console.log(req.body.email);

    const email = req.body.email
    const user = await User.findUserbyEmail(email);
    if(user === null){
      return res.json('email not in database');
    }
    else{
      const token = 
    }

  
});