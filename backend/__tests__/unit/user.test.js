
process.env.NODE_ENV = "test";

// model import
const User = require("../../models/user")

// test data imports 
const [TEST_USER_DATA] = require('../../seedData')
const TEST_USER = TEST_USER_DATA[0]

//test config  
const {
  afterAllHook,
  beforeEachHook,
} = require('../configTest');

describe("model user", function () {
  beforeEach(async function () {
    await beforeEachHook()
  });

  describe("Test User Class register", function () {
    test("should return  id and is_admin after successful register", async function () {
      let user = await User.create({
        "email": "newuser@gmail.com",
        "password": "secret",
        "first_name": "new",
        "last_name": "user"
      })
      expect(typeof user.id).toBe('number');
      expect(user.is_admin).toEqual(false);
    });

    test("should return error message when registering duplicate email address", async function () {
      try {
        await User.create({
          "email": "testuser@gmail.com",
          "password": "secret",
          "first_name": "Test",
          "last_name": "User"
        })
      } catch (err) {
        expect(err.message).toEqual("There already exists a user with email 'testuser@gmail.com");
        expect(err.status).toBe(401)
      }
    });
  });

  describe("Test User Class authenticate", function () {
    test("should return user object if correct password and email", async function () {
      let user = await User.authenticate({ "email": TEST_USER.email, "password": TEST_USER.password })

      expect(typeof user.id).toBe('number');
      expect(user.email).toBe(TEST_USER.email);
      expect(user.is_admin).toBe(false);
    });

    test("should return error message if password is wrong", async function () {
      try {
        await User.authenticate({ "email": TEST_USER.email, "password": "badPassword" })
      } catch (err) {
        expect(err.message).toEqual("Invalid Credentials");
        expect(err.status).toBe(401)
      }
    });

    test("should return error message if email is wrong", async function () {
      try {
        await User.authenticate({ "email": "bad@test.com", "password": TEST_USER.password })
      } catch (err) {
        expect(err.message).toEqual("Invalid Credentials");
        expect(err.status).toBe(401)
      }
    });
  });

  afterAll(async function () {
    await afterAllHook();
  });
})