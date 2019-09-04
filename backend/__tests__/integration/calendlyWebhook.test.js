process.env.NODE_ENV = "test";

// npm packages
const request = require('supertest');

// app imports
const app = require('../../app');

// model imports
const Appointments = require('../../models/appointment');

// helper function
const { parseResponse } = require("../../helpers/helperWebhook");


//test config  
const { SEED_USER_SQL, SEED_APPT_SQL } = require("../../config");
const {
  afterEachHook,
  afterAllHook
} = require("../config");

// mock calendly json
const mockCalendlyCreate = require("../mockCalendlyJson/mockCalendlyCreate.json");
const mockCalendlyCancel = require("../mockCalendlyJson/mockCalendlyCancel.json");
const mockCalendlyCreateBadEmail = require("../mockCalendlyJson/mockCalendlyCreateBadEmail.json");
const mockCalendlyCreateBadData = require("../mockCalendlyJson/mockCalendlyCreateBadData.json");

const db = require("../../db");

beforeEach(async function () {
  await db.query(SEED_USER_SQL);
  await db.query(SEED_APPT_SQL);
});

afterEach(async function () {
  await afterEachHook();
});

describe('POST /webhook', function () {
  test('Receives create calendly post request and process appointments data ', async function () {
    const response = await request(app)
      .post('/webhook')
      .send(mockCalendlyCreate);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('received');
  });

  test('Receives cancel calendly post request and process appointments data', async function () {
    await request(app)
      .post('/webhook')
      .send(mockCalendlyCreate);

    let response = await request(app)
      .post('/webhook')
      .send(mockCalendlyCancel);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('received');
  });

  test('Return 404 if email that passed is not found in our database', async function () {
    let response = await request(app)
      .post('/webhook')
      .send(mockCalendlyCreateBadEmail);
    expect(response.statusCode).toBe(404);
  });

  test('Return 400 if invalid object is passed in', async function () {
    let response = await request(app)
      .post('/webhook')
      .send(mockCalendlyCreateBadData);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(["instance.event_id is not of a type(s) string"]);
  });
});

describe('Appointments model', function () {
  test('Should insert new appointment record to database', async function () {
    const eventPayload = mockCalendlyCreate.payload;
    const parsedObj = parseResponse(eventPayload);
    let response = await Appointments.create(parsedObj)
    expect(response.event_id).toBe("FHKED5IPUQV6KXXG");
    expect(response.start_time).toBe("2019-08-30T11:00:00-07:00")
  });

  test('Should update appointment record to database', async function () {
    // creating test appointment
    const createPayload = mockCalendlyCreate.payload;
    const createParsedObj = parseResponse(createPayload);
    await Appointments.create(createParsedObj)

    const cancelPayload = mockCalendlyCancel.payload;
    const cancelParsedObj = parseResponse(cancelPayload);
    let response = await Appointments.cancel(cancelParsedObj)

    expect(response.event_id).toBe("FHKED5IPUQV6KXXG");
    expect(response.canceled).toBe(true)
  });
});

afterAll(async function () {
  await afterAllHook();
});
