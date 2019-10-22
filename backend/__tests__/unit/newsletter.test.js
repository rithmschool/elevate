process.env.NODE_ENV = "test";

// app imports
const db = require("../../db");
const Newsletter = require("../../models/newsletter");

describe("Test Salary model", function() {
  beforeEach(async () => {
    await db.query(`DELETE FROM newsletter_emails;`);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM newsletter_emails;`);
  });

  afterAll(async () => {
    await db.end();
  });

  test("create a new email sign up", async function() {
    const newSignUp = {
      email: "john@doe.com"
    };
    const response = await Newsletter.register(newSignUp);

    expect(response).toEqual({ email: "john@doe.com" });
  });

  test("get a single email", async function() {
    const newSignUp = {
      email: "john@doe.com"
    };
    await Newsletter.register(newSignUp);

    const response = await Newsletter.findOne({ email: "john@doe.com" });
    expect(response).toEqual({ email: "john@doe.com" });
  });
});
