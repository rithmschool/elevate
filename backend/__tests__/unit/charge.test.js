process.env.NODE_ENV = "test";

// app imports
const db = require("../../db");
const Charge = require("../../models/charge");
const { SEED_USER_SQL, SEED_SALARY_SQL, SEED_CHARGES_SQL } = require("../../config");

describe("Charge model test setup and teardown", function () {
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

  describe("Charge model unit tests", function () {
    test("get all charges", async function () {
      const response = await Charge.findAll();

      expect(response).toEqual([{
          id: expect.any(Number),
          user_id: 1,
          amount: 500,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: null,
          paid: false
        },
        {
          id: expect.any(Number),
          user_id: 2,
          amount: 1000.99,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: expect.any(Date),
          paid: true
        },
        {
          id: expect.any(Number),
          user_id: 3,
          amount: 500,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: null,
          paid: false
        },
        {
          id: expect.any(Number),
          user_id: 4,
          amount: 750,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: null,
          paid: false
        },
        {
          id: expect.any(Number),
          user_id: 5,
          amount: 1000,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: null,
          paid: false
        },
      ]);
    });

    test("create a charge", async function () {
      const newCharge = { user_id: 1, amount: 200.00, description: 'Subscription charge.', due_date: '2019-10-15', payment_date: null}
      const response = await Charge.create(newCharge);

      expect(response).toEqual({
        amount: 200, 
        description: 'Subscription charge.', 
        due_date: expect.any(Date), 
        payment_date: null, 
        user_id: 1 });
    });

    test("update a charge", async function () {
      const updatedCharge = { amount: 200.00, description: 'Subscription charge.', due_date: '2019-10-15', payment_date: null}
      const response = await Charge.update(999999, updatedCharge);

      expect(response).toEqual({ 
        id: 999999,
        user_id: 1,
        amount: 200,
        description: 'Subscription charge.',
        due_date: expect.any(Date),
        payment_date: null,
        paid: false });
    });

    test("throws error if trying to update a charge that does not exist", async function () {
      try {
        const updatedCharge = { amount: 200.00, description: 'Subscription charge.', due_date: '2019-10-15', payment_date: null}
        await Charge.update(999, updatedCharge);
      } catch (err) {
        expect(err.message).toEqual('There exists no charge 999');
      }
    });

    test("delete a charge", async function () {
      const response = await Charge.remove(999999);

      expect(response).toEqual({ id: 999999 });
    });

    test("throws error if trying to delete a charge that does not exist", async function () {
      try {
        await await Charge.remove(777777);
      } catch (err) {
        expect(err.message).toEqual('There exists no charge 777777');
      }
    });
  });
});