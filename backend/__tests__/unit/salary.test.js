process.env.NODE_ENV = "test";

// app imports
const Salary = require("../../models/salary");

// test data imports 
const [ TEST_USER_DATA ] = require('../../seedData')
const TEST_USER = TEST_USER_DATA[0]
let USER = {}

//test config  
const {
  afterAllHook,
  beforeEachHook,
  getUserToken
} = require('../configTest');

beforeEach(async () => {
  await beforeEachHook()
  await getUserToken(USER, TEST_USER)
});

describe("Test Salary model", function () {
  test("get all salaries", async function () {
    const response = await Salary.findAll();
    expect(response).toEqual([{
        id: expect.any(Number),
        user_id: 1,
        salary: 170000.00,
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

  test("create a new salary", async function () {
    const newSalary = { 
      user_id: USER.currentId,
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 
    };

    const response = await Salary.create(newSalary);
    expect(response).toEqual({ 
      id: expect.any(Number),
      user_id: USER.currentId,
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 });
  });

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

  test("throws error if trying to update a salary that does not exist", async function () {
    try {
      const updatedSalary = { 
        salary: 105000.00, 
        equity: 0.005 }
      await Salary.updateWithUserId(10, updatedSalary)
    } catch (err) {
      expect(err.message).toEqual('There exists no salary for user 10');
    }
  });

  test("delete a salary", async function () {
    const newSalary = { 
      user_id: USER.currentId,
      salary: 105000.00, 
      bonus: 2000.00, 
      equity: 0.005 
    };

    const responseCreate = await Salary.create(newSalary);
    const salaryId = responseCreate.id
    
    const response = await Salary.remove(salaryId);
    expect(response).toEqual({ id: salaryId});
    expect("hello").toBe("hello")
  });

  test("throws error if trying to delete a salary that does not exist", async function () {
    try {
      await Salary.remove(6);
    } catch (err) {
      expect(err.message).toEqual('There exists no salary 6');
    }
  });
});

afterAll(async () => {
  await afterAllHook()
});

