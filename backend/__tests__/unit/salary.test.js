process.env.NODE_ENV = "test";

// app imports
const db = require("../../db");
const Salary = require("../../models/salary");
const { SEED_DB_SQL } = require("../../config");


describe("Test Salary model", function () {
  beforeEach(async () => {
    await db.query(`DELETE FROM charges;`);
    await db.query(`DELETE FROM users;`);
    await db.query(`DELETE FROM salaries;`);
    await db.query(SEED_DB_SQL);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM charges;`);
    await db.query(`DELETE FROM users;`);
    await db.query(`DELETE FROM salaries;`);
  });

  afterAll(async () => {
    await db.end();
  });


  test("get all salaries", async function () {
    const response = await Salary.findAll();
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
    const newSalary = { 
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 
    }
    const response = await Salary.create(newSalary);
    expect(response).toEqual({ 
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 });
  });

  test("update a salary", async function () {
    const updatedSalary = { 
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 }
    const response = await Salary.update(1, updatedSalary);
    expect(response).toEqual({ 
      id: 1, 
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 
    });
  });

  test("throws error if trying to update a salary that does not exist", async function () {
    try {
      const updatedSalary = { 
        salary: 105000.00, 
        bonus: 2000.00, 
        equity: 0.005 }
      await Salary.update(999, updatedSalary);
    } catch (err) {
      expect(err.message).toEqual('There exists no salary 999');
    }
  });

  test("delete a salary", async function () {
    const response = await Salary.remove(1);
    expect(response).toEqual({ id: 1 });
  });

  test("throws error if trying to delete a salary that does not exist", async function () {
    try {
      await Salary.remove(6);
    } catch (err) {
      expect(err.message).toEqual('There exists no salary 6');
    }
  });
});
