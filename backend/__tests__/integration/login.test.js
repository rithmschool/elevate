process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const db = require("../../db");

const { SEED_USER_SQL } = require("../../config")
const { afterAllHook,
  afterEachHook,
  beforeEachHook,
  TEST_DATA,
  inputPassword,
  inputEmail } = require("../config")



describe("routes for login", function () {
  beforeEach(async function () {
    await beforeEachHook(TEST_DATA);
    await db.query(SEED_USER_SQL);
  });

  afterEach(async function () {
    await afterEachHook()
  });

  describe("POST /login", function () {
    test("It should have property of token", async function () {

      const response = await request(app)
        .post("/login")
        .send({ "email": inputEmail, "password": inputPassword })
      expect(response.body.token).not.toBe(undefined)
    });
  });

  describe("POST /login", function () {
    test("It should give an error of invalid credential when email is not valid", async function () {

      const response = await request(app)
        .post("/login")
        .send({ "email": 'bad@gmail.com', "password": inputPassword })
      expect(response.body).toEqual({ "message": "Invalid Credentials", "status": 401 })
    });
  });

  describe("POST /login", function () {
    test("It should give an error of invalid credential when password is not valid", async function () {


      const response = await request(app)

        .post("/login")
        .send({ "email": inputEmail, "password": "badPassword" })
      expect(response.body).toEqual({ "message": "Invalid Credentials", "status": 401 })
    });
  });
});

afterAll(async function () {
  await afterAllHook();
})