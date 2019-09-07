// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// test data imports
const [ TEST_USER_DATA ] = require('../../seedData')
const TEST_USER = TEST_USER_DATA[0]

//test config  
const {
    afterAllHook,
    beforeEachHook
} = require("../configTest");

beforeEach(async function() {
  await beforeEachHook()
});


// TODO: FIX THESE
xdescribe("POST /reset-password", function() {
  test("Creates a new password token", async function() {
    let data = {
      email: TEST_USER.email
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
        email: "bad@rmail.com"
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "This user with this email bad@rmail.com doesn't exist!",
      status: 400
    });
  });
});

xdescribe("GET /reset-password/:token", function() {
  const resetPasswordToken = "t3ae9a322f541237af6890edc9b3a4f940f124566";
  const baddToken = "f3ae9a322f541237af6890edc9b3a4f940f124566";

  test("verify token is valid", async function() {
    const response = await request(app).get(`/password/${resetPasswordToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("first_name");
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(1);
  });

  test("verify if token is not valid", async function() {
    const response = await request(app).get(`/password/${baddToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Password reset link is invalid",
      status: 400
    });
  });
});

xdescribe("PATCH /password/", function() {
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
        email: "test@gmail.com",
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
