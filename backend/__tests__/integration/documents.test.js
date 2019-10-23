process.env.NODE_ENV = "test";

// npm packages
const request = require('supertest');

// app imports
const app = require('../../app');

// model imports
const User = require('../../models/document');

//test config  
const { SEED_DOCUMENTS_SQL } = require("../../config")
const db = require("../../db");
const {
  TEST_DATA,
  TEST_ADMIN_DATA,
  afterEachHook,
  afterAllHook,
  beforeEachHook,
  inputEmail,
  inputPassword
} = require('../config');

beforeEach(async function () {
  await beforeEachHook(TEST_DATA, TEST_ADMIN_DATA);
  await db.query(SEED_USER_SQL);

});
