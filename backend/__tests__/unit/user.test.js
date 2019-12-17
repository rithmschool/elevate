process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");

// model import
const User = require("../../models/user");

// test config
const { SEED_USER_SQL } = require("../../config");
const {
  afterAllHook,
  afterEachHook,
  beforeEachHook,
  TEST_DATA,
  inputPassword,
  inputEmail
} = require("../config");

// database import
const db = require("../../db");

describe("model user", function() {
  beforeEach(async function() {
    await beforeEachHook(TEST_DATA);
    await db.query(SEED_USER_SQL);
  });

  afterEach(async function() {
    await afterEachHook();
  });

  describe("Test User Class register", function() {
    test("should return  id and is_admin after successful register", async function() {
      let user = await User.register({ email: "newuser@gmail.com", password: "secret" });
      expect(typeof user.id).toBe("number");
      expect(user.is_admin).toEqual(false);
    });

    test("should return error message when registering duplicate email address", async function() {
      try {
        await User.register({ email: "testuser@gmail.com", password: "secret" });
      } catch (err) {
        expect(err.message).toEqual("There already exists a user with email 'testuser@gmail.com");
        expect(err.status).toBe(401);
      }
    });

    /* Remaining tests correspond to signupFormValidation middleware */
    test("Prevents empty form fields", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          passwordConfirm: ""
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Registration form is missing required fields");
    });

    test("Returns 400 error when email is invalid format", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          email: "not_a_valid_email",
          first_name: "fname",
          last_name: "lname",
          password: inputPassword,
          passwordConfirm: inputPassword
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Invalid email");
    });

    test("Returns 400 error when password length < 6", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          email: inputEmail,
          first_name: "fname",
          last_name: "lname",
          password: "short",
          passwordConfirm: "short"
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Invalid password length");
    });

    test("Returns 400 error when password and passwordConfirm do not match", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          email: inputEmail,
          first_name: "fname",
          last_name: "lname",
          password: "secret",
          passwordConfirm: "notsosecret"
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Passwords do not match");
    });
  });

  describe("Test User Class authenticate", function() {
    test("should return user object if correct password and email", async function() {
      let user = await User.authenticate({ email: inputEmail, password: inputPassword });

      expect(typeof user.id).toBe("number");
      expect(user.email).toBe(inputEmail);
      expect(user.is_admin).toBe(false);
    });

    test("should return error message if password is wrong", async function() {
      try {
        await User.authenticate({ email: inputEmail, password: "badPassword" });
      } catch (err) {
        expect(err.message).toEqual("Invalid Credentials");
        expect(err.status).toBe(401);
      }
    });

    test("should return error message if email is wrong", async function() {
      try {
        await User.authenticate({ email: "bad@test.com", password: inputPassword });
      } catch (err) {
        expect(err.message).toEqual("Invalid Credentials");
        expect(err.status).toBe(401);
      }
    });
  });

  afterAll(async function() {
    await afterAllHook();
  });
});
