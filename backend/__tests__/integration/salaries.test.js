process.env.NODE_ENV = "test";

// npm packages
const request = require('supertest');

// app imports
const app = require('../../app');

// model imports
const Salary = require('../../models/salary');

// test data imports
const [ TEST_USER_DATA ] = require('../../seedData')
const TEST_USER = TEST_USER_DATA[0]
let USER ={}

//test config  
const {
    getUserToken,
    afterAllHook,
    beforeEachHook
} = require("../configTest");

beforeEach(async function () {
  await beforeEachHook();
  await getUserToken(USER, TEST_USER)
});

describe('POST /salaries', function () {
  test('Creates a new salary', async function () {
    const response = await request(app)
      .post('/salaries')
      .send({
        user_id: 1,
        salary: 95000.00,
        bonus: 5000.00,
        equity: 0.003,
        _token: USER.userToken
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.salary).toHaveProperty('bonus');
  });
});

describe('GET /salaries', function () {
  test('Gets a list of all salaries', async function () {
    const response = await request(app).get('/salaries');
    expect(response.body.salaries).toHaveLength(5);
    expect(response.body.salaries[0]).toHaveProperty('bonus');
  });
});

describe('GET /salaries/:id', function () {
  test('Gets a single salary for a specific user', async function () {
    const response = await request(app)
      .get(`/salaries/${USER.currentId}`)
      .send({ _token: USER.userToken });
    
    expect(response.body.salaries).toHaveProperty('bonus');
    expect(response.body.salaries.bonus).toEqual(25000);
  });

  test('Responds with a 500 if user has no salary data', async function () {
    const userId = 6;
    const response = await request(app)
      .get(`/salaries/${userId}`)
      .send({ _token: USER.userToken });
    expect(response.statusCode).toBe(500);
  });
});

describe('PATCH /salaries/:id', function () {
  test("Updates a single field for a salary record", async function () {
    const response = await request(app)
      .patch(`/salaries/${USER.currentId}`)
      .send({
        salary: 150000.00,
        _token: USER.userToken
      });
    expect(response.body.salary).toHaveProperty('salary');
    expect(response.body.salary.salary).toBe(150000.00);
    expect(response.body.salary.salary).not.toBe(null);
  });

  // TODO: this test requires a schema to validate whether the request contains any valid fields.
  // The current behavior creates a new record with all of the old fields copied over from
  // the original salary record and returns a 200
  xtest('Prevents a bad salary update', async function () {
    const userId = TEST_DATA.currentId;
    const response = await request(app)
      .patch(`/salaries/${userId}`)
      .send({
        _token: TEST_DATA.userToken,
        cactus: false
      });
    expect(response.statusCode).toBe(400);
  });
});

describe('DELETE /salaries/:id', function () {
  test('Deletes a single salary', async function () {
    const newSalary = {
      user_id: USER.currentId,
      salary: 105000.00,
      bonus: 2000.00,
      equity: 0.005
    };
    const salaryResponse = await Salary.create(newSalary);
    const salaryId = salaryResponse.id

    const response = await request(app)
      .delete(`/salaries/${salaryId}`)
      .send({ 
        _token: USER.userToken });
    expect(response.body).toEqual({ message: 'Salary deleted' });
  });

  test('Responds with a 404 if it cannot find the salary in question', async function () {
    const salaryId = 666; 
    const response = await request(app)
      .delete(`/salaries/${salaryId}`)
      .send({
        _token: USER.userToken
      });
    expect(response.statusCode).toBe(404);
  });
});

afterAll(async function () {
  await afterAllHook();
});
