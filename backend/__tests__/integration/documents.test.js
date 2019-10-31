process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");

const { SEED_USER_SQL, SEED_DOCUMENTS_SQL } = require("../../config");
const db = require("../../db");

const {
  TEST_DATA,
  TEST_ADMIN_DATA,
  afterEachHook,
  afterAllHook,
  beforeEachHook
} = require("../config");

beforeEach(async function() {
  await beforeEachHook(TEST_DATA, TEST_ADMIN_DATA);
  await db.query(`DELETE FROM documents;`);
  await db.query(`DELETE FROM users`);
  await db.query(`ALTER SEQUENCE documents_id_seq RESTART WITH 1;`);
  await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
  await db.query(SEED_USER_SQL);
  await db.query(SEED_DOCUMENTS_SQL);
});

afterEach(async function() {
  await afterEachHook();
});

afterAll(async function() {
  await afterAllHook();
});

describe("GET /admin/documents", function() {
  test("Gets all documents for the admin view", async function() {
    const response = await request(app)
      .get("/admin/documents")
      .send({ _token: TEST_ADMIN_DATA.userToken });

    expect(response.body.documents).toHaveLength(5);
    expect(response.body.documents[0]).toHaveProperty("title");
  });

  test("Throws error if user not an admin", async function() {
    const response = await request(app)
      .get("/admin/documents")
      .send({ _token: TEST_DATA.userToken });

    expect(response.body).toEqual({
      message: "You must be an admin to access",
      status: 401
    });
  });
});
