// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// app imports
const app = require("../app");
const db = require("../db");

// global auth variable to store things for all the tests
const TEST_DATA = {};
const ADMIN_TEST_DATA = {};
const inputPassword = "test"
const inputEmail = "test@gmail.com"
const adminEmail = "asgfdfgd@gmail.com"
const adminPassword = "adminPassword"
const is_admin = true

/**
 * Hooks to insert a user, charges, and salaries, and to authenticate
 *  the user for respective tokens that are stored
 *  in the input `testData` parameter.
 * @param {Object} TEST_DATA - build the TEST_DATA object
 */
async function beforeEachHook(TEST_DATA) {
  // create and login a user, get a token, store the user ID and token
  try {

    // bcrypt set lower for testing purpose
    const hashedPassword = await bcrypt.hash(inputPassword, 5)

    // create new user with hashed password
    await db.query(
      `INSERT INTO users 
                  (email, password) 
                  VALUES ($1, $2) 
                  RETURNING id, is_admin`,
      [inputEmail, hashedPassword]);

    const response = await request(app)
      .post("/login")
      .send({
        email: inputEmail,
        password: inputPassword,
      });
    TEST_DATA.userToken = response.body.token;
    TEST_DATA.currentId = jwt.decode(TEST_DATA.userToken).user_id;


      // bcrypt set lower for testing purpose
      const hashedPass = await bcrypt.hash(adminPassword, 5)

      // create new user with hashed password
      await db.query(
        `INSERT INTO users 
                    (email, password,is_admin) 
                    VALUES ($1, $2,$3) 
                    RETURNING id, is_admin`,
        [adminEmail, hashedPass, is_admin]);
  
      const adminResponse = await request(app)
        .post("/login")
        .send({
          email: adminEmail,
          password: adminPassword,
          
        });
      ADMIN_TEST_DATA.userToken = adminResponse.body.token;
      ADMIN_TEST_DATA.currentId = jwt.decode(ADMIN_TEST_DATA.userToken).user_id;

  } catch (error) {
    console.error(error);
  }
}

async function afterEachHook() {
  try {
    await db.query("DELETE FROM users");
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`)
  } catch (error) {
    console.error(error);
  }
}

async function afterAllHook() {
  try {
    await db.end();
  } catch (err) {
    console.error(err);
  }
}


module.exports = {
  afterAllHook,
  afterEachHook,
  beforeEachHook,
  TEST_DATA,
  ADMIN_TEST_DATA,
  inputPassword,
  inputEmail
};
