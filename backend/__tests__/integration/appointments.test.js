process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// test data imports
const [ TEST_USER_DATA ] = require('../../seedData')
const TEST_USER = TEST_USER_DATA[0]
const TEST_ADMIN = TEST_USER_DATA[1]
let USER ={}
let ADMIN_USER = {}

//test config  
const {
    getUserToken,
    getAdminToken,
    afterAllHook,
    beforeEachHook
} = require("../configTest");

beforeEach(async function () {
    await beforeEachHook();
    await getAdminToken(ADMIN_USER, TEST_ADMIN)
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
        //create non admin user to get id
        await getUserToken( USER ,TEST_USER) 
        
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
