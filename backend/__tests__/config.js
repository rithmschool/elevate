// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// app imports
const app = require("../app");
const db = require("../db");

// global auth variable to store things for all the tests
const TEST_DATA = {};
const TEST_ADMIN_DATA = {};
const inputPassword = "password123";
const inputEmail = "testuser@gmail.com";
const inputAdminPassword = "admin123";
const inputAdminEmail = "admin@gmail.com";
const passwordToken = "t3ae9a322f541237af6890edc9b3a4f940f124566";
const invalidPasswordToken = "f3ae9a322f541237af6890edc9b3a4f940f124566";
const expireTime = 99999999999999;
/**
 * Hooks to insert a user, company, and job, and to authenticate
 *  the user and the company for respective tokens that are stored
 *  in the input `testData` parameter.
 * @param {Object} TEST_DATA - build the TEST_DATA object
 * @param {Object} TEST_ADMIN_DATA - build the TEST_ADMIN_DATA object
 */
async function beforeEachHook(TEST_DATA, TEST_ADMIN_DATA) {
  // create and login a user, get a token, store the user ID and token
  try {
    // bcrypt set lower for testing purpose
    const hashedPassword = await bcrypt.hash(inputPassword, 5);

    // create new user with hashed password
    await db.query(
      `INSERT INTO users 
                  (email, password, reset_password_token, reset_password_expires) 
                  VALUES ($1, $2, $3, $4) 
                  RETURNING id, is_admin`,
      [inputEmail, hashedPassword, passwordToken, expireTime]
    );

    const response = await request(app)
      .post("/login")
      .send({
        email: inputEmail,
        password: inputPassword
      });

    TEST_DATA.userToken = response.body.token;
    TEST_DATA.currentId = jwt.decode(TEST_DATA.userToken).user_id;
  } catch (error) {
    console.error(error);
  }

  // create and login a user, get a token, store the user ID and token
  try {
    // bcrypt set lower for testing purpose
    const hashedPassword = await bcrypt.hash(inputAdminPassword, 5);

    // create new user with hashed password
    await db.query(
      `INSERT INTO users 
                  (email, password, reset_password_token, reset_password_expires, is_admin) 
                  VALUES ($1, $2, $3, $4, $5)
                  RETURNING id, is_admin`,
      [inputEmail, hashedPassword, passwordToken, expireTime, true]
    );

    const response = await request(app)
      .post("/login")
      .send({
        email: inputAdminEmail,
        password: inputAdminPassword
      });
    console.log("TOKEN!", response.body);
    TEST_ADMIN_DATA.userToken = response.body.token;
    TEST_ADMIN_DATA.currentId = jwt.decode(TEST_ADMIN_DATA.userToken).id;
  } catch (error) {
    console.error(error);
  }
}

async function afterEachHook() {
  try {
    await db.query("DELETE FROM users");
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
    await db.query("DELETE FROM documents");
    await db.query(`ALTER SEQUENCE documents_id_seq RESTART WITH 1;`);
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
  TEST_ADMIN_DATA,
  inputPassword,
  inputEmail,
  inputAdminPassword,
  inputAdminEmail,
  passwordToken,
  invalidPasswordToken
};
