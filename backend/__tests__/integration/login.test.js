process.env.NODE_ENV = "test";

// test suits import
const request = require("supertest");

// app import
const app = require("../../app");

// test data imports
const [ TEST_USER_DATA ] = require('../../seedData')
const TEST_USER = TEST_USER_DATA[0]

//test config  
const {
    afterAllHook,
    beforeEachHook
} = require("../configTest");

describe("routes for login", function () {
  beforeEach(async function () {
   await beforeEachHook()
  });

  describe("POST /login", function () {
    test("It should have property of token", async function () {
      const response = await request(app)
        .post("/login")
        .send({ "email": TEST_USER.email, "password": TEST_USER.password })
      expect(response.body.token).not.toBe(undefined)
    });
  });

  describe("POST /login", function () {
    test("It should give an error of invalid credential when email is not valid", async function () {
      const response = await request(app)
        .post("/login")
        .send({ "email": 'bad@gmail.com', "password": TEST_USER.password })
      expect(response.body).toEqual({ "message": "Invalid Credentials", "status": 401 })
    });
  });

  describe("POST /login", function () {
    test("It should give an error of invalid credential when password is not valid", async function () {
      const response = await request(app)
        .post("/login")
        .send({ "email": TEST_USER.email, "password": "badPassword" })
      expect(response.body).toEqual({ "message": "Invalid Credentials", "status": 401 })
    });
  });
});

afterAll(async function () {
  await afterAllHook();
})