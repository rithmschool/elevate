process.env.NODE_ENV = "test";

// app imports
const db = require("../../db");
const Admin = require("../../models/admin");
const { SEED_DOCUMENTS_SQL, SEED_USER_SQL } = require("../../config");

describe("Test Salary model", function() {
  beforeEach(async () => {
    await db.query(`DELETE FROM users;`);
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
    await db.query(`DELETE FROM documents;`);
    await db.query(`ALTER SEQUENCE documents_id_seq RESTART WITH 1;`);
    await db.query(SEED_USER_SQL);
    await db.query(SEED_DOCUMENTS_SQL);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM documents;`);
    await db.query(`ALTER SEQUENCE documents_id_seq RESTART WITH 1;`);
    await db.query(`DELETE FROM users`);
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
  });

  afterAll(async () => {
    await db.end();
  });

  test("Get all documents", async function() {
    const response = await Admin.getAllDocuments();
    expect(response).toEqual([
      {
        id: 1,
        title: "contract1.pdf",
        counterparty: "Bill Billson",
        date_submitted: "2020-10-20T04:32:00",
        date_reviewed: null,
        url: "www.conctractz.com/contract1",
        user_id: 1,
        status: "unreviewed"
      },
      {
        id: 2,
        title: "contract2.pdf",
        counterparty: "Bill Billson",
        date_submitted: "2020-10-29T13:37:00",
        date_reviewed: null,
        url: "www.conctractz.com/contract2",
        user_id: 1,
        status: "unreviewed"
      },
      {
        id: 3,
        title: "contract3.pdf",
        counterparty: "Bill Billson",
        date_submitted: "2020-10-23T19:39:00",
        date_reviewed: "2020-10-24",
        url: "www.conctractz.com/contract3",
        user_id: 2,
        status: "reviewed"
      },
      {
        id: 4,
        title: "contract4.pdf",
        counterparty: "Bill Billson",
        date_submitted: "2020-10-29T13:33:00",
        date_reviewed: null,
        url: "www.conctractz.com/contract4",
        user_id: 3,
        status: "unreviewed"
      },
      {
        id: 5,
        title: "contract5.pdf",
        counterparty: "Bill Billson",
        date_submitted: "2020-10-22T11:31:00",
        date_reviewed: null,
        url: "www.conctractz.com/contract5",
        user_id: 4,
        status: "unreviewed"
      }
    ]);
  });

  test("Throws error if no documents exist", async function() {
    try {
      await Admin.getAllDocuments();
    } catch (err) {
      expect(err.message).toEqual("Can't find any documents.");
    }
  });
});
