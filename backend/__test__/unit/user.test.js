const User = require("../../models/user")

const db = require("../../db");


// NOTE: JUST COPIED FROM SAMPLE
describe("Test User Class register", function () {
    beforeEach(async function () {
        await db.query("DELETE FROM users");

    });

    test("should return  id and is_admin after successful register", async function () {

        let user = await User.register({ "email": "test@test.com", "password": "secret" })

        expect(typeof user.id).toBe('number');
        expect(user.is_admin).toEqual(false);
    });

    test("should return error message when registering duplicate email address", async function () {
        await User.register({ "email": "test@test.com", "password": "secret" })
        try {
            await User.register({ "email": "test@test.com", "password": "secret" })
        } catch (err) {
            expect(err.message).toEqual("There already exists a user with email 'test@test.com");
            expect(err.status).toBe(401)
        }

    });


});

describe("Test User Class authenticate", function () {
    beforeEach(async function () {
        await db.query("DELETE FROM users");
        await User.register({ "email": "test@test.com", "password": "secret" })

    });

    test("should return user object if correct password and email", async function () {

        let user = await User.authenticate({ "email": "test@test.com", "password": "secret" })

        expect(typeof user.id).toBe('number');
        expect(user.email).toBe("test@test.com");
        expect(user.is_admin).toBe(false);

    });

    test("should return error message if password is wrong", async function () {
        try {
            await User.authenticate({ "email": "test@test.com", "password": "secret1" })
        } catch (err) {
            expect(err.message).toEqual("Invalid Credentials");
            expect(err.status).toBe(401)
        }
    })


    test("should return error message if email is wrong", async function () {
        try {
            await User.authenticate({ "email": "test1@test.com", "password": "secret" })
        } catch (err) {
            expect(err.message).toEqual("Invalid Credentials");
            expect(err.status).toBe(401)
        }

    });



});



afterAll(async function () {
    await db.end();
});
