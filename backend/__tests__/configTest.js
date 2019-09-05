// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");

// app imports
const app = require("../app");
const db = require("../db");

const User = require("../models/user");
const Appointment = require("../models/appointment");
const Salary = require("../models/salary");

/** login a user, get a token, store the user ID and token*/
async function getUserToken(userData) {
  try {
    let user = {}

    const response = await request(app)
      .post("/login")
      .send({
        email: userData.email,
        password: userData.password,
      });

    user.userToken = response.body.token;
    user.currentId = jwt.decode(user.userToken).user_id;
    return user

  } catch (error) {
    console.error(error);
  }
}

async function createTestData(model, dataArray) {
 console.log(model)
  for(data of dataArray){
   switch(model){
    case 'user':
       await User.create(data);
    case 'appointment':
      await Appointment.create(data)
    case 'salary':
     await Salary.create(data)
   }
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
  createTestData
};
