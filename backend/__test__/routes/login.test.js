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

  describe("POST /login", function () {
  
    test("It should give an error of invalid credential when email is not valid", async function () {
      
      const response = await request(app)

     
        .post("/login")
        .send({ "email": "test@test.com", "password": "secret123" })
      expect(response.body).toEqual({"message": "Invalid Credentials", "status": 401})
    })
  })

  describe("POST /login", function () {
    test("It should give an error of invalid credential when password is not valid", async function () {
     
      const response = await request(app)

        .post("/login")
        .send({ "email": "testlogin@test.com", "password": "secret12345" })
      expect(response.body).toEqual({"message": "Invalid Credentials", "status": 401})
    })
  })
})

afterAll(async function () {
  await db.end();
});