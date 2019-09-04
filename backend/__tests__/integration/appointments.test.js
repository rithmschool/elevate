process.env.NODE_ENV = "test";

// npm packages
const request = require('supertest');

// app imports
const app = require('../../app');

// model imports
const Appointments = require('../../models/appointment');

//test config  
const { SEED_USER_SQL, SEED_APPT_SQL } = require("../../config");
const {
    afterEachHook,
    afterAllHook,
    TEST_DATA,
    beforeEachHook
} = require("../config");

const db = require("../../db");

beforeEach(async function () {
    await beforeEachHook(TEST_DATA);
    await db.query(SEED_USER_SQL);
    await db.query(SEED_APPT_SQL);
});

afterEach(async function () {
    await afterEachHook();
});

describe('GET /appointments', function () {
    test('should response with all appointments ', async function () {
        const response = await request(app)
            .get('/appointments')
            .send({ _token: TEST_DATA.userToken });
        expect(response.statusCode).toBe(200);
        expect(response.body.appointments.length).not.toBe(0);
    });
});

describe('GET /appointments/:email', function () {
    test('should response with matched appointments with params email', async function () {
        let response = await request(app)
            .get('/appointments/nate@gmail.com')
            .send({ _token: `${TEST_DATA.userToken}` });
        expect(response.statusCode).toBe(200);
        expect(response.body.appointments.user_id).toBe(4);
    });

    test('Return 400 if invalid object is passed in', async function () {
        let response = await request(app)
            .get('/appointments/bademail@gmail.com')
            .send({ _token: `${TEST_DATA.userToken}` });
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("no appointment for bademail@gmail.com");
    });
});

afterAll(async function () {
    await afterAllHook();
});
