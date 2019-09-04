process.env.NODE_ENV = "test";

// npm packages
const request = require('supertest');

// app imports
const app = require('../../app');

// model imports
const User = require('../../models/user');

//test config  
const { SEED_USER_SQL } = require("../../config")
const db = require("../../db");
const {
  TEST_DATA,
  afterEachHook,
  afterAllHook,
  beforeEachHook,
  inputEmail,
  inputPassword
} = require('../config');

beforeEach(async function () {
  await beforeEachHook(TEST_DATA);
  await db.query(SEED_USER_SQL);

});

afterEach(async function () {
  await afterEachHook();
});

describe('POST /users', function () {
  test('Creates a new user', async function () {
    let dataObj = {
      email: 'newtest@gmail.com',
      password: 'secret',
    };
    const response = await request(app)
      .post('/users')
      .send(dataObj);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');

  });

  test('Prevents creating a user with duplicate email', async function () {
    const response = await request(app)
      .post('/users')
      .send({
        email: inputEmail,
        password: inputPassword,
      });
    expect(response.statusCode).toBe(401);
  });
});

describe('GET /users', function () {
  test('Gets a list of 1 user', async function () {
    const response = await request(app)
      .get('/users')
      .send({ _token: `${TEST_DATA.userToken}` });

    expect(response.body.users).toHaveLength(6);
    expect(response.body.users[0]).toHaveProperty('company');
    expect(response.body.users[0]).not.toHaveProperty('password');
  });
});

describe('GET /users/:id', function () {
  test('Gets a list of 1 user', async function () {
    const response = await request(app)
      .get(`/users/${TEST_DATA.currentId}`)
      .send({ _token: `${TEST_DATA.userToken}` });
    expect(response.body.user).toHaveProperty('email');
    expect(response.body.user).not.toHaveProperty('password');
  });

  test('Responds with a 401 if it cannot find the user in question', async function () {
    const response = await request(app)
      .get(`/users/baduser`)
      .send({ _token: `${TEST_DATA.userToken}` });
    expect(response.statusCode).toBe(401);
  });
});


describe('PATCH /users/:id', () => {
  test("Updates a single a user's first_name with a selective update", async function () {
    const response = await request(app)
      .patch(`/users/${TEST_DATA.currentId}`)
      .send({ first_name: 'xkcd', _token: `${TEST_DATA.userToken}` });
    const user = response.body.user;

    expect(user).toHaveProperty('email');
    expect(user).not.toHaveProperty('password');
    expect(user.first_name).toBe('xkcd');
    expect(user.username).not.toBe(null)
  });

  test("Updates a single a user's password", async function () {
    const response = await request(app)
      .patch(`/users/${TEST_DATA.currentId}`)
      .send({ _token: `${TEST_DATA.userToken}`, password: 'foo12345' });

    const user = response.body.user;

    expect(user).toHaveProperty("email");
    expect(user).not.toHaveProperty('password');
  });

  test('Prevents a bad user update', async function () {
    const response = await request(app)
      .patch(`/users/${TEST_DATA.currentId}`)
      .send({ _token: "badtoken" });
    expect(response.statusCode).toBe(401);
  });

  test('Forbids a user from editing another user', async function () {
    const response = await request(app)
      .patch(`/users/notme`)
      .send({ password: 'foo12345', _token: `${TEST_DATA.userToken}` });
    expect(response.statusCode).toBe(401);
  });

  test('Responds with a 404 if it cannot find the user in question', async function () {
    // delete user first
    await request(app)
      .delete(`/users/${TEST_DATA.currentId}`)
      .send({ _token: `${TEST_DATA.userToken}` });
    const response = await request(app)
      .patch(`/users/${TEST_DATA.currentId}`)
      .send({ _token: `${TEST_DATA.userToken}`, password: 'foo12345' });
    expect(response.body.message).toBe("There exists no user with that id");
  });
});

describe('DELETE /users/:username', function () {
  test('Deletes a single a user', async function () {
    const response = await request(app)
      .delete(`/users/${TEST_DATA.currentId}`)
      .send({ _token: `${TEST_DATA.userToken}` });
    expect(response.body).toEqual({ message: 'User deleted' });
  });

  test('Forbids a user from deleting another user', async function () {
    const response = await request(app)
      .delete(`/users/notme`)
      .send({ _token: `${TEST_DATA.userToken}` });
    expect(response.statusCode).toBe(401);
  });

  test('Responds with a 404 if it cannot find the user in question', async function () {
    // delete user first
    await request(app)
      .delete(`/users/${TEST_DATA.currentUsername}`)
      .send({ _token: `${TEST_DATA.userToken}` });
    const response = await request(app)
      .delete(`/users/${TEST_DATA.currentUsername}`)
      .send({ _token: `${TEST_DATA.userToken}` });
    expect(response.statusCode).toBe(401);
  });
});

afterAll(async function () {
  await afterAllHook();
});
