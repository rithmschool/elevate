process.env.NODE_ENV = "test";

const db = require("../../db");
const Salary = require("../../models/salary");
const User = require("../../models/user");
const { SEED_USER_SQL, SEED_SALARY_SQL } = require("../../config");


describe("Test Salary model", function () {
  beforeEach(async () => {
    await db.query(`DELETE FROM users;`);
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`)
    await db.query(`DELETE FROM salaries;`);
    await db.query(`ALTER SEQUENCE salaries_id_seq RESTART WITH 1;`)
    await db.query(SEED_USER_SQL);
    await db.query(SEED_SALARY_SQL);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM users;`);
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`)
    await db.query(`DELETE FROM salaries;`);
    await db.query(`ALTER SEQUENCE salaries_id_seq RESTART WITH 1;`)
  });

  afterAll(async () => {
    await db.end();
  });

  test("create a new salary", async function () {
    const newUser = {
      email: "john@doe.com",
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
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 
    };

    const response = await Salary.create(newSalary);
    expect(response).toEqual({ 
      id: expect.any(Number),
      user_id: expect.any(Number),
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 });
  });

  test("delete a salary", async function () {
    const response = await Salary.remove(2);
    expect(response).toEqual({ id: 2 });
  });

  test("throws error if salary to delete does not exist", async function () {
    try {
      await Salary.remove(6);
    } catch (err) {
      expect(err.message).toEqual('There exists no salary 6');
    }
  });
});
