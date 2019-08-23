process.env.NODE_ENV = "test";

// app imports
const db = require("../../db");
const Salary = require("../../models/salary");
const { SEED_USER_SQL, SEED_SALARY_SQL, SEED_CHARGES_SQL } = require("../../config");


describe("Test Salary model", function () {
  beforeEach(async () => {
    await db.query(`DELETE FROM charges;`);
    await db.query(`DELETE FROM users;`);
    await db.query(`DELETE FROM salaries;`);
    await db.query(SEED_USER_SQL);
    await db.query(SEED_SALARY_SQL);
    await db.query(SEED_CHARGES_SQL);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM charges;`);
    await db.query(`DELETE FROM users;`);
    await db.query(`DELETE FROM salaries;`);
  });

  afterAll(async () => {
    await db.end();
  });


  xtest("get all salaries", async function () {
    const response = await Salary.findAll();
    expect(response).toEqual([{
        id: expect.any(Number),
        user_id: 1,
        salary: 150000.00,
        bonus: 25000.00,
        equity: .001,
      },
      {
        id: expect.any(Number),
        user_id: 2,
        salary: 100000.00,
        bonus: 5000.00,
        equity: .005,
      },
      {
        id: expect.any(Number),
        user_id: 3,
        salary: 90000.00,
        bonus: 2000.00,
        equity: .0035,
      },
      {
        id: expect.any(Number),
        user_id: 4,
        salary: 200000.00,
        bonus: 5000.00,
        equity: .33,
      },
      {
        id: expect.any(Number),
        user_id: 5,
        salary: 200000.00,
        bonus: 5000.00,
        equity: .10,
      },
    ]);
  });

  // //FIXME: need user model to complete this test per comments below
  // xtest("create a new salary", async function () {
  //   const newUser = {
  //     email: "john@doe.com",
  //     password: "yeehaw",
  //     is_admin: false,
  //     first_name: "john",
  //     last_name: "doe",
  //     current_company: "john deer",
  //     hire_date: "2016-05-01",
  //     needs: "a new truck",
  //     goals: "get a raise for new truck down payment"
  //   };
  //   //need user model to create new user
  //   //then need to query test db for user_id
  //   //insert user_id into newSalary and then create new salary
  //   const userResponse = await 

  //   const newSalary = { 
  //     salary: 105000.00, 
  //     bonus: 2000.00, 
  //     equity: 0.005 
  //   };

  //   const response = await Salary.create(newSalary);
  //   expect(response).toEqual({ 
  //     id: expect.any(Number),
  //     user_id: 3,
  //     salary: 105000.00, 
  //     bonus: 2000.00, 
  //     equity: 0.005 });
  // });

  //FIXME: follow same pattern for create salary above to look up salary id from user_id
  test("update a salary", async function () {
    const updatedSalary = { 
      salary: 105000.00, 
      equity: 0.005 }
    
    const response = await Salary.updateWithUserId(3, updatedSalary);
    expect(response).toEqual({ 
      id: expect.any(Number),
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005,
      user_id: 3
    });
  });

  //FIXME: 
  xtest("throws error if trying to update a salary that does not exist", async function () {
    try {
      const updatedSalary = { 
        salary: 105000.00, 
        equity: 0.005 }
      await Salary.updateWithUserId(3, updatedSalary)
    } catch (err) {
      expect(err.message).toEqual('There exists no salary 999999');
    }
  });

  xtest("delete a salary", async function () {
    const response = await Salary.remove(666666);
    expect(response).toEqual({ id: 666666 });
  });

  xtest("throws error if trying to delete a salary that does not exist", async function () {
    try {
      await Salary.remove(6);
    } catch (err) {
      expect(err.message).toEqual('There exists no salary 6');
    }
  });
});
