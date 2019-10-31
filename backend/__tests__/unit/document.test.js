process.env.NODE_ENV = "test";

// model import
const Document = require("../../models/document");

// test config
const { SEED_DOCUMENTS_SQL, SEED_USER_SQL } = require("../../config");
const {
  afterAllHook,
  afterEachHook,
  beforeEachHook,
  TEST_DATA
} = require("../config");

// database import
const db = require("../../db");

describe("model document", function() {
  beforeEach(async function() {
    await beforeEachHook(TEST_DATA);
    await db.query(SEED_USER_SQL);
    await db.query(SEED_DOCUMENTS_SQL);
  });

  afterEach(async function() {
    await afterEachHook();
  });

  test("get all documents", async function() {
    const response = await Document.getAllByUser(2);
    expect(response).toEqual([
      {
        id: 3,
        title: "contract3.pdf",
        counterparty: "Bill Billson",
        url: "www.conctractz.com/contract3",
        date_submitted: "2020-10-23T19:39:00",
        date_reviewed: "2020-10-24",
        status: "reviewed"
      }
    ]);
  });

  afterAll(async function() {
    await afterAllHook();
  });
});
