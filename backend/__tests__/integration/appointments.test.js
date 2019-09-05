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
    TEST_ADMIN_DATA,
    inputEmail,
    beforeEachHook
} = require("../config");

const db = require("../../db");

beforeEach(async function () {
    await beforeEachHook(TEST_DATA, TEST_ADMIN_DATA);
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
            .send({ _token: TEST_ADMIN_DATA.userToken });
        expect(response.statusCode).toBe(200);
        expect(response.body.appointments.length).not.toBe(0);
    });
});

describe('GET /appointments/:id', function () {
    test('should response with matched appointments with params id', async function () {
        console.log("I am enter test")
        let userId = TEST_DATA.currentId;
        console.log("id is ", userId)
        const appointment = {
            user_email: inputEmail,
            user_id: userId,
            event_id: "BCHFF2F62BWNJVPZ",
            calendly_user_id: "ABCFF2F62BWNJVPP",
            created_at: "2020-08-29T09:15:00-07:00",
            event_type: "One-on-One",
            event_type_name: "30 Minute Meeting",
            reason: "legal advice",
            admin_notes: null,
            start_time: "2020-08-31T09:15:00-07:00",
            start_time_pretty: "09:15 am - Saturday, August 31, 2020",
            end_time: "2020-08-31T09:45:00-07:00",
            end_time_pretty: "09:45 am - Saturday, August 31, 2020",
            location: "Zoom",
            canceled: false,
            canceler_name: null,
            cancel_reason: null,
            canceled_at: null,
            old_event_id: null,
            new_event_id: null
        };
        await Appointments.create(appointment);
        
        let response = await request(app)
            .get(`/appointments/${userId}`)
            .send({ _token: TEST_DATA.userToken });
            console.log("res body is", response.body.appointments.user_id)
        expect(response.statusCode).toBe(200);
        expect(response.body.appointments[0].user_id).toBe(userId);
    });

    test('should allow admin user  to get matched appointments with user_id', async function () {
        let userId = TEST_DATA.currentId;
        const appointment = {
            user_email: inputEmail,
            user_id: userId,
            event_id: "BCHFF2F62BWNJVPZ",
            calendly_user_id: "ABCFF2F62BWNJVPP",
            created_at: "2020-08-29T09:15:00-07:00",
            event_type: "One-on-One",
            event_type_name: "30 Minute Meeting",
            reason: "legal advice",
            admin_notes: null,
            start_time: "2020-08-31T09:15:00-07:00",
            start_time_pretty: "09:15 am - Saturday, August 31, 2020",
            end_time: "2020-08-31T09:45:00-07:00",
            end_time_pretty: "09:45 am - Saturday, August 31, 2020",
            location: "Zoom",
            canceled: false,
            canceler_name: null,
            cancel_reason: null,
            canceled_at: null,
            old_event_id: null,
            new_event_id: null
        };
        await Appointments.create(appointment);
     
        let response = await request(app)
            .get(`/appointments/${userId}`)
            .send({ _token: TEST_ADMIN_DATA.userToken });
        expect(response.statusCode).toBe(200);
        expect(response.body.appointments[0].user_id).toBe(userId);
    });

    test('Return 401 if user is not authorized', async function () {
        let response = await request(app)
            .get('/appointments/100')
            .send({ _token: `${TEST_DATA.userToken}` });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual("You are not authorized");
    });
});

afterAll(async function () {
    await afterAllHook();
});
