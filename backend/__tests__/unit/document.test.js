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
    await db.query(SEED_DOCUMENTS_SQL);
    await db.query(SEED_USER_SQL);
  });

  afterEach(async function () {
    await afterEachHook()
  });

  test("get all documents", async function() {
    const response = await Document.getAll(1);
    expect(response).toEqual([
      {
        id: 1,
        title: "Burger Flipper",
        counterparty: "Squidward",
        url: "www.spongebob.com",
        date_submitted: "2020-08-29",
        date_reviewed: "2019-11-13",
        status: "Completed"
      },
      {
        id: 3,
        title: "Burger Flipper Manager",
        counterparty: "Squidward",
        url: "www.spongebob.com",
        date_submitted: "2020-08-29",
        date_reviewed: "2019-11-13",
        status: "In Progress"
      }
    ]);
  });

  afterAll(async function () {
      await afterAllHook();
    });
});
