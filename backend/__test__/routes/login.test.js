const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const User = require("../../models/user");

describe("routes for login", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM users");
    await User.register({ "email": "testlogin@test.com", "password": "secret123" })

  })

  afterEach(async function () {
    await db.query("DELETE FROM users");

  });

  describe("POST /login", function () {
    test("It should have property of token", async function () {
      const response = await request(app)
        .post("/login")
        .send({ "email": "testlogin@test.com", "password": "secret123" })
      expect(response.body).toHaveProperty("token")
    })
  })
})

afterAll(async function () {
  await db.end();
});