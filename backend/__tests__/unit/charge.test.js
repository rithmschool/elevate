process.env.NODE_ENV = "test";

// app imports
const db = require("../../db");
const Charges = require("../../models/charges");

const { SEED_USER_SQL, SEED_CHARGES_SQL } = require("../../config");


describe("Test Charge model", function () {
    beforeEach(async () => {
        await db.query(`DELETE FROM users;`);
        await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`)
        await db.query(`DELETE FROM charges;`);
        await db.query(`ALTER SEQUENCE charges_id_seq RESTART WITH 1;`)
        await db.query(SEED_USER_SQL);
        await db.query(SEED_CHARGES_SQL);
    });
    afterEach(async () => {
        await db.query(`DELETE FROM users;`);
        await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`)
        await db.query(`DELETE FROM charges;`);
        await db.query(`ALTER SEQUENCE charges_id_seq RESTART WITH 1;`)
    });

    afterAll(async () => {
        await db.end();
    });
    test("get all charges", async function () {
        const response = await Charges.findAll();
        expect(response).toEqual(
            [
                {
                    id: expect.any(Number),
                    user_id: 1,
                    amount: 500,
                    description: 'Percentage of negotiation salary.',
                    due_date: expect.any(Date),
                    payment_date: null,
                    paid: false
                },
                {
                    id: expect.any(Number),
                    user_id: 3,
                    amount: 1000.99,
                    description: 'Percentage of negotiation salary.',
                    due_date: expect.any(Date),
                    payment_date: expect.any(Date),
                    paid: true
                },
                {
                    id: expect.any(Number),
                    user_id: 3,
                    amount: 500,
                    description: 'Percentage of negotiation salary.',
                    due_date: expect.any(Date),
                    payment_date: null,
                    paid: false
                },
                {
                    id: expect.any(Number),
                    user_id: 4,
                    amount: 750,
                    description: 'Percentage of negotiation salary.',
                    due_date: expect.any(Date),
                    payment_date: null,
                    paid: false
                },
                {
                    id: expect.any(Number),
                    user_id: 5,
                    amount: 1000,
                    description: 'Percentage of negotiation salary.',
                    due_date: expect.any(Date),
                    payment_date: null,
                    paid: false
                }]
        );
    });

    test("creates a new charge", async function () {
        const newCharge =
        {
            user_id: 4,
            amount: 200,
            due_date: "2019-04-20",
            description: "test"
        }
        const response = await Charges.create(newCharge);
        expect(response).toEqual({
            id: expect.any(Number),
            user_id: 4,
            amount: 200,
            description: "test",
            due_date: expect.any(Date)
        });
    });

    test("get a single charge by the charge id", async function () {
        let chargeId = 1;
        const response = await Charges.getCharge(chargeId);
        expect(response).toEqual({
            id: 1,
            amount: 500,
            description: 'Percentage of negotiation salary.'
        }

        );
    });

    test("update a charge when the charge is payed", async function () {
        let chargeId = 1
        let updateData = {
            payment_date: "2019-04-20",
            paid: "t"
        }
        const response = await Charges.update(chargeId, updateData);
        expect(response).toEqual({
            id: 1,
            user_id: 1,
            amount: 500,
            description: 'Percentage of negotiation salary.',
            due_date: expect.any(Date),
            payment_date: expect.any(Date),
            paid: true
        });

    });
    test("remove a charge from the db, returns id of deleted charge", async function(){
        const response = await Charges.remove(1);
        expect(response).toEqual({
            id:1
        })
    });
});