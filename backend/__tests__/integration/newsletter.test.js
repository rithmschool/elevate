process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

//test config
const db = require("../../db");

const { afterAllHook } = require("../config");

beforeEach(async function() {
  await db.query("DELETE FROM newsletter_emails");
  await db.query(
    "INSERT INTO newsletter_emails (email) VALUES ('test@yahoo.com')"
  );
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

describe("GET /newsletter", function() {
  test("Finds an email if that email has signed up", async function() {
    const response = await request(app)
      .get("/newsletter")
      .query({ email: "test@yahoo.com" });

    expect(response.statusCode).toBe(200);
    expect(response.body.email.email).toEqual("test@yahoo.com");
  });
});
