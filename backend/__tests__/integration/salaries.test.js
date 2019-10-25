process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");
const Salary = require("../../models/salary");

const { SEED_USER_SQL, SEED_SALARY_SQL } = require("../../config");
const db = require("../../db");

const {
  TEST_DATA,
  afterEachHook,
  afterAllHook,
  beforeEachHook
} = require("../config");

beforeEach(async function() {
  await beforeEachHook(TEST_DATA);
  await db.query(SEED_USER_SQL);
  await db.query(SEED_SALARY_SQL);
});

afterEach(async function() {
  await afterEachHook();
});

describe("POST /salaries", function() {
  test("Creates a new salary", async function() {
    const response = await request(app)
      .post("/salaries")
      .send({
        user_id: 1,
        salary: 95000.0,
        bonus: 5000.0,
        equity: 0.003,
        _token: `${TEST_DATA.userToken}`
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.salary).toHaveProperty("bonus");
  });
});

describe("GET /salaries/:id", function() {
  test("Gets a single salary for a specific user", async function() {
    const userId = TEST_DATA.currentId;
    const response = await request(app)
      .get(`/salaries/${userId}`)
      .send({ _token: `${TEST_DATA.userToken}` });

    expect(response.body.salaries).toHaveProperty("bonus");
    expect(response.body.salaries.bonus).toEqual(25000);
  });

  test("Responds with a 500 if user has no salary data", async function() {
    const userId = 6;
    const response = await request(app)
      .get(`/salaries/${userId}`)
      .send({ _token: TEST_DATA.userToken });
    expect(response.statusCode).toBe(500);
  });
});

describe("DELETE /salaries/:id", function() {
  test("Deletes a single salary", async function() {
    const newUser = {
      email: "john_the_second@doe.com",
      password: "yeehaw",
      is_admin: false,
      first_name: "john",
      last_name: "doe",
      current_company: "john deer",
      hire_date: "2016-05-01",
      needs: "a new truck",
      goals: "get a raise for new truck down payment"
    };

    const userResponse = await User.register(newUser);

    const newSalary = {
      user_id: userResponse.id,
      salary: 105000.0,
      bonus: 2000.0,
      equity: 0.005
    };

    const salaryResponse = await Salary.create(newSalary);
    const salaryId = salaryResponse.id;

    const response = await request(app)
      .delete(`/salaries/${salaryId}`)
      .send({
        _token: TEST_DATA.userToken
      });
    expect(response.body).toEqual({ message: "Salary deleted" });
  });

  test("Responds with a 404 if it cannot find salary", async function() {
    const salaryId = 666;
    const response = await request(app)
      .delete(`/salaries/${salaryId}`)
      .send({
        _token: TEST_DATA.userToken
      });
    expect(response.statusCode).toBe(404);
  });
});

afterAll(async function() {
  await afterAllHook();
});
