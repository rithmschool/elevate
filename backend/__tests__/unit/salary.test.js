process.env.NODE_ENV = "test";

// app imports
const db = require("../../db");
const Salary = require("../../models/salary");

const SEED_SALARY_TABLE = `INSERT INTO salaries (salary, bonus, equity) VALUES
  (150000.00, 25000.00, .001),
  (100000.00, 5000.00, .005),
  (90000.00, 2000.00, .0035),
  (200000.00, 5000.00, .33),
  (200000.00, 5000.00, .10);
  
  INSERT INTO salaries (id, salary, bonus, equity) VALUES
    (666666, 65000.00, 100.00, .001);`


describe("Test Salary model", function () {
  beforeEach(async () => {
    await db.query(`DELETE FROM salaries;`);
    await db.query(SEED_SALARY_TABLE);
  });

  afterEach(async () => {
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
      },
      {
        id: expect.any(Number),
        salary: 65000.00,
        bonus: 100.00,
        equity: .001,
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
      id: expect.any(Number),
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 });
  });

  test("update a salary", async function () {
    const updatedSalary = { 
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 }
    const response = await Salary.update(666666, updatedSalary);
    expect(response).toEqual({ 
      id: 666666, 
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
      await Salary.update(999999, updatedSalary);
    } catch (err) {
      expect(err.message).toEqual('There exists no salary 999999');
    }
  });

  test("delete a salary", async function () {
    const response = await Salary.remove(666666);
    expect(response).toEqual({ id: 666666 });
  });

  test("throws error if trying to delete a salary that does not exist", async function () {
    try {
      await Salary.remove(6);
    } catch (err) {
      expect(err.message).toEqual('There exists no salary 6');
    }
  });
});
