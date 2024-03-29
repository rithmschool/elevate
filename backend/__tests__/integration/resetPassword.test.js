// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

//test config
const { SEED_USER_SQL } = require("../../config");
const db = require("../../db");

const {
  TEST_DATA,
  afterEachHook,
  afterAllHook,
  beforeEachHook,
  inputEmail,
  passwordToken,
  invalidPasswordToken
} = require("../config");

beforeEach(async function() {
  await beforeEachHook(TEST_DATA);
  await db.query(SEED_USER_SQL);
});
afterEach(async function() {
  await afterEachHook();
});

// TODO: FIX THESE
describe("POST /reset-password", function() {
  test("Creates a new password token", async function() {
    let data = {
      email: inputEmail
    };
    const response = await request(app)
      .post(`/password`)
      .send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Recovery email sent!" });
  });

  test("if email not exist in db", async function() {
    const response = await request(app)
      .post(`/password`)
      .send({
        email: "bademail@gmail.com"
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "This user with this email bademail@gmail.com doesn't exist!",
      status: 400
    });
  });
});

describe("GET /reset-password/:token", function() {
  test("verify token is valid", async function() {
    const response = await request(app).get(`/password/${passwordToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("first_name");
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(1);
  });

  test("verify if token is not valid", async function() {
    const response = await request(app).get(
      `/password/${invalidPasswordToken}`
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Password reset link is invalid",
      status: 400
    });
  });
});

describe("PATCH /password/", function() {
  test("Update a password", async function() {
    const id = 1;
    const response = await request(app)
      .patch(`/password/${id}`)
      .send({
        resetPasswordToken: passwordToken,
        password: "Touili12345"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      response: {
        id: 1,
        email: "testuser@gmail.com",
        first_name: null,
        last_name: null,
        current_company: null,
        hire_date: null,
        needs: null,
        goals: null
      }
    });
  });
});

afterAll(async function() {
  await afterAllHook();
});
