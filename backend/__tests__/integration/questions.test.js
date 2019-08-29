
process.env.NODE_ENV = "test";
const request = require('supertest');

// app imports
const app = require('../../app');

const Question = require("../../models/question")

describe("Test Question model", function () {
  beforeEach(async () => {
    await db.query(`DELETE FROM questions;`);
    await db.query(`ALTER SEQUENCE questions_id_seq RESTART WITH 1;`);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM questions;`);
    await db.query(`ALTER SEQUENCE questions_id_seq RESTART WITH 1;`);
  });

  afterAll(async () => {
    await db.end();
  });

  test("POST /questions", async function () {
    const dataObj = {
      question: "Is this a test question?",
      email: "thisIsATestEmail@gmail.com"
    }
    await request(app)
      .post('/questions')
      .send(dataObj);

    const response = await Question.findAll();
    expect(response[0].question).toEqual('Is this a test question?')
    expect(response[0].email).toEqual('thisIsATestEmail@gmail.com')
  });
});

const db = require("../../db");