
process.env.NODE_ENV = "test";


const Question = require("../../models/question")

const { afterAllHook,
  afterEachHook,
  beforeEachHook,
  TEST_DATA,
  inputPassword,
  inputEmail } = require("../config")


const db = require("../../db");