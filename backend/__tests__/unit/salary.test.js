process.env.NODE_ENV = "test";

// app imports
const db = require("../../db");
const { Salary } = require("../../models/salary");
const { SEED_DB_SQL } = require("../../config");


describe("Test Salary model", function () {
  beforeEach(async () => {
    await db.query(DELETE FROM charges;);
  await db.query(DELETE FROM users;);
await db.query(DELETE FROM salaries;);
await db.query(SEED_DB_SQL);
  });

afterEach(async () => {
  await db.query(DELETE FROM charges;);
await db.query(DELETE FROM users;);
await db.query(DELETE FROM salaries;);
  });

afterAll(async () => {
  await db.end();
});


describe("Salary model unit tests", function () {
  test("get all salaries", async function () {
    const response = await findAll();
    expect(response).toEqual([{
      id: expect.any(Number),
      salary: 150000.00,
      bonus: 25000.00,
      equity: .001,
    },
    {
      id: expect.any(Number),
      salary: 100000.00,
      bonus: 5000.00,
      equity: .005,
    },
    {
      id: expect.any(Number),
      salary: 90000.00,
      bonus: 2000.00,
      equity: .0035,
    },
    {
      id: expect.any(Number),
      salary: 200000.00,
      bonus: 5000.00,
      equity: .33,
    },
    {
      id: expect.any(Number),
      salary: 200000.00,
      bonus: 5000.00,
      equity: .10,
    }
    ]);
  });


  test("create a new salary", async function () {
    const newSalary = { salary: 105000.00, bonus: 2000.00, equity: 0.005 }
    const response = await create(newSalary);
    expect(response).toEqual({ salary: 105000.00, bonus: 2000.00, equity: 0.005 });
  });

  test("update a salary", async function () {
    const updatedSalary = { salary: 105000.00, bonus: 2000.00, equity: 0.005 }
    const response = update(1, updatedSalary);
    expect(response).toEqual({ id: 1, salary: 105000.00, bonus: 2000.00, equity: 0.005 });
  });

  test("throws error if trying to update a salary that does not exist", async function () {
    try {
      const updatedSalary = { salary: 105000.00, bonus: 2000.00, equity: 0.005 }
      await Charge.update(999, updatedCharge);
    } catch (err) {
      expect(err.message).toEqual('There exists no charge 999');
    }
  });

  test("delete a charge", async function () {
    const response = await Charge.remove(1);
    expect(response).toEqual({ id: 1 });
  });

  test("throws error if trying to delete a charge that does not exist", async function () {
    try {
      await await Charge.remove(6);
    } catch (err) {
      expect(err.message).toEqual('There exists no charge 6');
    }
  });
});
