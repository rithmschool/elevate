// npm packages
const request = require('supertest');

// app imports
const app = require('../../app');

// model imports
const User = require('../../models/user');
const Salary = require('../../models/salary');

//test config  
const { SEED_USER_SQL, SEED_SALARY_SQL } = require("../../config")
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
  await db.query(SEED_SALARY_SQL);
});

afterEach(async function () {
  await afterEachHook();
});

describe('POST /salaries', async function () {
  test('Creates a new salary', async function () {
    const response = await request(app)
      .post('/salaries')
      .send({
        user_id: 1,
        salary: 95000.00,
        bonus: 5000.00,
        equity: 0.003,
        _token: `${TEST_DATA.userToken}`
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.salary).toHaveProperty('bonus');
  });
});

describe('GET /salaries', async function () {
  test('Gets a list of all salaries', async function () {
    const response = await request(app).get('/salaries');
    expect(response.body.salaries).toHaveLength(5);
    expect(response.body.salaries[0]).toHaveProperty('bonus');
  });
});

describe('GET /salaries/:id', async function () {
  test('Gets a single salary for a specific user', async function () {
    const userId = TEST_DATA.currentId;
    const response = await request(app)
      .get(`/salaries/${userId}`)
      .send({ _token: `${TEST_DATA.userToken}` });
    
    expect(response.body.salaries).toHaveProperty('bonus');
    expect(response.body.salaries.bonus).toEqual(25000);
  });

  test('Responds with a 500 if user has no salary data', async function () {
    const userId = 6;
    const response = await request(app)
      .get(`/salaries/${userId}`)
      .send({ _token: TEST_DATA.userToken });
    expect(response.statusCode).toBe(500);
  });
});

xdescribe('PATCH /salaries/:id', async function () {
  test("Updates a single a company's name", async function () {
    const response = await request(app)
      .patch(`/companies/${TEST_DATA.currentCompany.handle}`)
      .send({
        name: 'xkcd',
        _token: TEST_DATA.userToken
      });
    expect(response.body.company).toHaveProperty('handle');
    expect(response.body.company.name).toBe('xkcd');
    expect(response.body.company.handle).not.toBe(null);
  });

  test('Prevents a bad salary update', async function () {
    const response = await request(app)
      .patch(`/companies/${TEST_DATA.currentCompany.handle}`)
      .send({
        _token: TEST_DATA.userToken,
        cactus: false
      });
    expect(response.statusCode).toBe(400);
  });

  test('Responds with a 404 if it cannot find the salary in question', async function () {
    // delete company first
    await request(app).delete(`/companies/${TEST_DATA.currentCompany.handle}`);
    const response = await request(app)
      .patch(`/companies/taco`)
      .send({
        name: 'newTaco',
        _token: TEST_DATA.userToken
      });
    expect(response.statusCode).toBe(404);
  });
});

xdescribe('DELETE /salaries/:id', async function () {
  test('Deletes a single salary', async function () {
    const response = await request(app)
      .delete(`/salaries/${TEST_DATA.currentCompany.handle}`)
      .send({
        _token: TEST_DATA.userToken
      });
    expect(response.body).toEqual({ message: 'Salary deleted' });
  });

  test('Responds with a 404 if it cannot find the salary in question', async function () {
    // delete company first
    const response = await request(app)
      .delete(`/companies/notme`)
      .send({
        _token: TEST_DATA.userToken
      });
    expect(response.statusCode).toBe(404);
  });
});


afterAll(async function () {
  await afterAllHook();
});
