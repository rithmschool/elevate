// npm packages
const request = require('supertest');

// app imports
const app = require('../../app');

// model imports
const Charges = require('../../models/charges');

const User =  require('../../models/user');


//test config  
const { SEED_USER_SQL, SEED_CHARGES_SQL } = require("../../config")
const db = require("../../db");

const {
    TEST_DATA,
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
                user_id: 1,
                amount: 500,
                description: "new charge on account",
                due_date: "2019-05-21"
            });
        expect(response.statusCode).toBe(200);
    });
   
});
describe('GET /charges', function () {
    test("Get all of the charges from the database", async function () {
        const response = await request(app).get('/charges');
        expect(response.body.charges).toHaveLength(5);
    });
    test('GET /charges :id, get all outstanding charges for user', 
    async function () {
        const userId = TEST_DATA.currentId;
        const response = await request(app)
            .get(`/charges/${userId}`)
        expect(response.body.charges[0].user_id).toEqual(1);
        expect(response.body.charges[0].amount).toEqual(500);
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
                { token: 'tok_visa', chargeId: chargeResponse.id }
            );
        expect(response.body.status).toEqual("succeeded");
    })
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
                { token: 'tok_visa', chargeId: 2 }
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
                { token: 'tok_chargeDeclined', chargeId: chargeResponse.id }
            );
        expect(response.body).toEqual("Your card was declined.");
    });
});


afterAll(async function () {
    await afterAllHook();
});
