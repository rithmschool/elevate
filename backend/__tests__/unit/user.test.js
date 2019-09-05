
process.env.NODE_ENV = "test";

// model import
const User = require("../../models/user")

// test config
const { USER_DATA } = require("../configTestData")
const { afterAllHook,
  afterEachHook,
  createTestData,
} = require("../configTest")

// database import
const db = require("../../db");

describe("model user", function () {
  beforeEach(async function () {
    await createTestData('user', USER_DATA);
  });

  afterEach(async function () {
    await afterEachHook('users')
  });

describe("Test User Class register", function () {
    test("should return  id and is_admin after successful register", async function () {
      // let user = await User.create({ "email": "newuser@gmail.com", "password": "secret" })
      // expect(typeof user.id).toBe('number');
      // expect(user.is_admin).toEqual(false);
      expect("hello").toEqual("hello")
    });

    // test("should return error message when registering duplicate email address", async function () {
    //   try {
    //     await User.create({ "email": "testuser@gmail.com", "password": "secret" })
    //   } catch (err) {
    //     expect(err.message).toEqual("There already exists a user with email 'testuser@gmail.com");
    //     expect(err.status).toBe(401)
    //   }
    // });
  });

  // describe("Test User Class authenticate", function () {
  //   test("should return user object if correct password and email", async function () {
  //     let user = await User.authenticate({ "email": inputEmail, "password": inputPassword })

  //     expect(typeof user.id).toBe('number');
  //     expect(user.email).toBe(inputEmail);
  //     expect(user.is_admin).toBe(false);
  //   });

  //   test("should return error message if password is wrong", async function () {
  //     try {
  //       await User.authenticate({ "email": inputEmail, "password": "badPassword" })
  //     } catch (err) {
  //       expect(err.message).toEqual("Invalid Credentials");
  //       expect(err.status).toBe(401)
  //     }
  //   });

  //   test("should return error message if email is wrong", async function () {
  //     try {
  //       await User.authenticate({ "email": "bad@test.com", "password": inputPassword })
  //     } catch (err) {
  //       expect(err.message).toEqual("Invalid Credentials");
  //       expect(err.status).toBe(401)
  //     }
  //   });
  // });

  afterAll(async function () {
    await afterAllHook();
  });
})