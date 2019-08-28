// npm packages
const request = require('supertest');

// app imports
const app = require('../../app');


// model imports
const Charges = require('../../models/charges');

const User = require('../../models/user');


//test config  
const { SEED_USER_SQL, SEED_CHARGES_SQL } = require("../../config")
const db = require("../../db");

const {
    TEST_DATA,
    ADMIN_TEST_DATA,
    afterEachHook,
    afterAllHook,
    beforeEachHook,
} = require('../config');

beforeEach(async function () {
    await beforeEachHook(TEST_DATA);
    await db.query(SEED_USER_SQL);
    await db.query(SEED_CHARGES_SQL);

});

afterEach(async function () {
    await afterEachHook();
});

describe('POST /charges/new', function () {
    test("Create a new charge", async function () {
        const response = await request(app)
            .post('/charges/new')
            .send({
                _token: `${ADMIN_TEST_DATA.userToken}`,
                user_id: 1,
                amount: 500,
                description: "new charge on account",
                due_date: "2019-05-21"
            });
        expect(response.statusCode).toBe(200);
    });
    test("Only lets an admin create a chrage", async function () {
        const response = await request(app)
            .post('/charges/new')
            .send({
                _token: `${TEST_DATA.userToken}`,
                user_id: 1,
                amount: 500,
                description: "new charge on account",
                due_date: "2019-05-21"
            });
        expect(response.statusCode).toBe(401);
    });

});
describe('GET /charges', function () {

    test("Get all of the charges from the database", async function () {
        const response = await request(app)
            .get('/charges')
            .send({ _token: `${ADMIN_TEST_DATA.userToken}` });

        expect(response.body.charges).toHaveLength(5);
    });
    test("only admin can view all the charges", async function () {
        const response = await request(app)
            .get('/charges')
            .send({ _token: `$TEST_DATA.userToken}` });
        expect(response.statusCode).toBe(401)
        expect(response.body.charges).toBe(undefined);
    });
    test('GET /charges :id, get all outstanding charges for user',
        async function () {
            const userId = TEST_DATA.currentId;
            const response = await request(app)
                .get(`/charges/${userId}`)
                .send({ _token: `${TEST_DATA.userToken}` });

            expect(response.body.charges[0].user_id).toEqual(1);
            expect(response.body.charges[0].amount).toEqual(500);
        });
    test('GET /charges :id, enusring the correct user, expected to return a 401',
        async function () {
            const userId = TEST_DATA.currentId;
            const response = await request(app)
                .get(`/charges/${userId}`)
                .send({ _token: "invalid token!!" });

            expect(response.statusCode).toBe(401);
        });

});

describe('PATCH /charges', function () {

    test("updating the charge to payed inclduing the payment date", async function () {
        const newCharge = {
            user_id: 2,
            amount: 200,
            description: "new charge on acc",
            due_date: "2019-05-21"
        };
        const chargeResponse = await Charges.create(newCharge);
        const response = await request(app)
            .patch('/charges')
            .send(
                { _token: `${TEST_DATA.userToken}`, token: 'tok_visa', chargeId: chargeResponse.id }
            );
        expect(response.body.status).toEqual("succeeded");
    });
    test("if chargeId does not exist", async function () {
        const newCharge = {
            user_id: 1,
            amount: 5000,
            description: "new charge on acc",
            due_date: "2019-05-21"
        }
        const chargeResponse = await Charges.create(newCharge);
        const response = await request(app)
            .patch('/charges')
            .send(
                { _token: `${TEST_DATA.userToken}`, token: 'tok_visa', chargeId: 2 }
            );
        expect(response.body).toEqual("No charge exits or already payed");
    });
    test("if payment is not valid", async function () {
        const newCharge = {
            user_id: 1,
            amount: 2000,
            description: "new charge on acc",
            due_date: "2019-05-21"
        }
        const chargeResponse = await Charges.create(newCharge);
        const response = await request(app)
            .patch('/charges')
            .send(
                { _token: `${TEST_DATA.userToken}`, token: 'tok_chargeDeclined', chargeId: chargeResponse.id }
            );
        expect(response.body).toEqual("Your card was declined.");
    });
});
describe('DELETE /charges', function () {

    test("delete are charge, only the admin can", async function () {

        const newCharge = {
            user_id: 1,
            amount: 2000,
            description: "new charge on acc",
            due_date: "2019-05-21"
        }
        const chargeResponse = await Charges.create(newCharge);
        
        const response = await request(app)
            .delete(`/charges/${chargeResponse.id}`)
            .send(
                { _token: `${ADMIN_TEST_DATA.userToken}`}
            );
        expect(response.body).toEqual("Charge deleted!");
    });
});

afterAll(async function () {
    await afterAllHook();
});
