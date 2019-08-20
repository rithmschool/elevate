process.env.NODE_ENV = "test";
// app imports
const db = require("../../db");
const Charge = require("../../models/charge");
const {
  SEED_DB_SQL
} = require("../../config");

describe("Charge model", function () {
  beforeEach(async () => {
    await db.query(`DELETE FROM charges;`);
    await db.query(`DELETE FROM users;`);
    await db.query(`DELETE FROM salaries;`);
    await db.query(SEED_DB_SQL);
  })

  afterEach(async () => {
    await db.query(`DELETE FROM charges;`);
    await db.query(`DELETE FROM users;`);
    await db.query(`DELETE FROM salaries;`);
  });

  afterAll(async () => {
    await db.end();
  });

  describe("Charge.findAll", function () {
    test("finds all jobs", async function () {
      let response = await Charge.findAll();

      expect(response).toEqual([{
          id: 1,
          user_id: 1,
          amount: 500,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: null,
          paid: false
        },
        {
          id: 2,
          user_id: 3,
          amount: 1000.99,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: expect.any(Date),
          paid: true
        },
        {
          id: 3,
          user_id: 3,
          amount: 500,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: null,
          paid: false
        },
        {
          id: 4,
          user_id: 4,
          amount: 750,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: null,
          paid: false
        },
        {
          id: 5,
          user_id: 5,
          amount: 1000,
          description: 'Percentage of negotiation salary.',
          due_date: expect.any(Date),
          payment_date: null,
          paid: false
        }
      ]);
    });
  });
});