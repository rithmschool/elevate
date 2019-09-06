// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");

// app imports
const app = require("../app");
const db = require("../db");

// seed imports
const seedData = require("../seed")



/** login a user, get a token, store the user ID and token*/
async function getUserToken(userEmptyObj,userData) {
  console.log("I run to token")
  try {

    const response = await request(app)
      .post("/login")
      .send({
        email: userData.email,
        password: userData.password,
      });

    userEmptyObj.userToken = response.body.token;
    userEmptyObj.currentId = jwt.decode(userEmptyObj.userToken).user_id;

  } catch (error) {
    console.error(error);
  }
}

async function beforeEachHook() {
  try {
    await seedData()
  } catch (error) {
    console.error(error);
  }
}


async function afterEachHook(table) {
  try {
    await db.query(`DELETE FROM ${table}`);
    await db.query(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1;`)
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
  getUserToken,
  beforeEachHook,
};
