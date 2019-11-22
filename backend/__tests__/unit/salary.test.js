process.env.NODE_ENV = "test";

const db = require("../../db");
const Salary = require("../../models/salary");
const { SEED_USER_SQL, SEED_SALARY_SQL } = require("../../config");

describe("Test Salary model", function() {
  beforeEach(async () => {
    await db.query(`DELETE FROM users;`);
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
    await db.query(`DELETE FROM salaries;`);
    await db.query(`ALTER SEQUENCE salaries_id_seq RESTART WITH 1;`);
    await db.query(SEED_USER_SQL);
    await db.query(SEED_SALARY_SQL);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM users;`);
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
    await db.query(`DELETE FROM salaries;`);
    await db.query(`ALTER SEQUENCE salaries_id_seq RESTART WITH 1;`);
  });

  afterAll(async () => {
    await db.end();
  });

  test("create a new salary", async function() {
    const newSalary = {
      user_id: 1,
      salary: 105000.0,
      bonus: 2000.0,
      equity: 0.005
    };

    const response = await Salary.create(newSalary);
    expect(response).toEqual({
      id: expect.any(Number),
      user_id: 1,
      salary: 105000.0,
      bonus: 2000.0,
      equity: 0.005
    });
  });

  test("find latest salary for user by id", async function() {
    const response = await Salary.findLatestSalaryByUserId(1);
    const salary1 = {
      id: 1,
      user_id: 1,
      salary: 150000,
      bonus: 25000,
      equity: 0.001
    };

    expect(response).toEqual(salary1);
  });

  test("throws error if for salary retrievial if no user", async function() {
    try {
      await Salary.findLatestSalaryByUserId(100);
    } catch (err) {
      expect(err.message).toEqual(
        "Cannot find a salary for user with userId 100"
      );
    }
  });

  test("delete a salary by salary id", async function() {
    const response = await Salary.remove(2);
    expect(response).toEqual({ id: 2 });
  });

  test("throws error if salary to delete does not exist", async function() {
    try {
      await Salary.remove(100);
    } catch (err) {
      expect(err.message).toEqual("There exists no salary 100");
    }
  });
});
