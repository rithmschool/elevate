// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");

// app imports
const app = require("../app");
const db = require("../db");

// seed imports
const seedData = require("../seed")

// model imports
const User= require("../models/user")

/** login a user, get a token, store the user ID and token*/
async function makeUser(data, is_admin=false) {
  try {
    let newUser = {}
    if(is_admin) {
      await User.makeAdminUser(data, is_admin)
    }
    
    const response = await request(app)
      .post("/login")
      .send({
        email: data.email,
        password: data.password,
      });

    newUser.userToken = response.body.token;
    newUser.currentId = jwt.decode(newUser.userToken).user_id;
    return newUser

  } catch (error) {
    console.error(error);
  }
}

/**clean up database and seed data */
async function beforeAllHook() {
  try {
    await seedData()
  } catch (error) {
    console.error(error);
  }
}

/** Close connection with database */
async function afterAllHook() {
  try {
    await db.end();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  makeUser,
  afterAllHook,
  beforeAllHook,
};
