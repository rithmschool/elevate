process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

//test config
const db = require("../../db");

const {
  afterAllHook
} = require("../config");

beforeEach(async function() {
  await db.query("DELETE FROM newsletter_emails");
});

afterAll(async () => {
  await afterAllHook();
});

describe("POST /newsletter", function() {
  test("Creates a new newsletter signup email", async function() {
    const response = await request(app)
      .post("/newsletter")
      .send({
        email: "test@gmail.com"
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.newSignUp).toHaveProperty("email");
  });
});
