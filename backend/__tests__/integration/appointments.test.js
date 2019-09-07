process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// test data imports 
const [ TEST_USER_DATA ] = require('../../seedData')

//individual user data
const TEST_USER_DATA_ONE = TEST_USER_DATA[0]
const TEST_USER_DATA_TWO = TEST_USER_DATA[1]

// create test user token and data
let ADMIN_USER;
let USER;

//test config  
const {
  afterAllHook,
  beforeAllHook,
  makeUser,
} = require('../configTest');

beforeAll(async function () {
  await beforeAllHook();
  ADMIN_USER = await makeUser(TEST_USER_DATA_ONE, true)
  USER = await makeUser(TEST_USER_DATA_TWO)
});

describe('GET /appointments', function () {
    test('should response with all appointments ', async function () {
        const response = await request(app)
            .get('/appointments')
            .send({ _token: ADMIN_USER.userToken });
        expect(response.statusCode).toBe(200);
        expect(response.body.appointments.length).not.toBe(0);
    });
});

describe('GET /appointments/:id', function () {
    test('should response with matched appointments with params id', async function () {
        let response = await request(app)
            .get(`/appointments/${ADMIN_USER.currentId}`)
            .send({ _token: ADMIN_USER.userToken });
        expect(response.statusCode).toBe(200);
    });

    test('should allow admin user  to get matched appointments with user_id', async function () {
        let response = await request(app)
            .get(`/appointments/${USER.currentId}`)
            .send({ _token: ADMIN_USER.userToken });
        expect(response.statusCode).toBe(200);
    });

    test('Return 401 if user is not authorized', async function () {
        const response = await request(app)
            .get('/appointments/100')
            .send({ _token: USER.userToken });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual("You are not authorized");
    });
});

afterAll(async function() {
  await afterAllHook();
});
