process.env.NODE_ENV = "test";

const User = require("../../models/user")
const { SEED_DB_SQL } = require("../../config")
const bcrypt = require("bcrypt");

const db = require("../../db");

describe("model user", function () {
	beforeEach(async function () {
		await db.query(`DELETE FROM charges;`);
		await db.query(`DELETE FROM users;`);
		await db.query(`DELETE FROM salaries;`);
		await db.query(SEED_DB_SQL)
			
	});
	afterEach(async function () {
		await db.query(`DELETE FROM charges;`);
		await db.query(`DELETE FROM users;`);
		await db.query(`DELETE FROM salaries;`);
		

	});

	describe("Test User Class register", function () {

			test("should return  id and is_admin after successful register", async function () {

					let user = await User.register({ "email": "test@test.com", "password": "secret" })
					expect(typeof user.id).toBe('number');
					expect(user.is_admin).toEqual(false);
			});

			test("should return error message when registering duplicate email address", async function () {
					
					try {
							await User.register({ "email": "testuser@gmail.com", "password": "secret" })
					} catch (err) {
							expect(err.message).toEqual("There already exists a user with email 'testuser@gmail.com");
							expect(err.status).toBe(401)
					}

			});


	});

	describe("Test User Class authenticate", function () {


			test("should return user object if correct password and email", async function () {
			
					let inputPassword = "password123"
					let inputEmail = "testuser@gmail.com"
					const hashedPassword = await bcrypt.hash(inputPassword, 10)
			
					await db.query(`UPDATE users SET password= $1 WHERE email= $2;`, [hashedPassword, inputEmail]);

					let user = await User.authenticate({ "email": inputEmail, "password": inputPassword })

					expect(typeof user.id).toBe('number');
					expect(user.email).toBe(inputEmail);
					expect(user.is_admin).toBe(false);

			});

			test("should return error message if password is wrong", async function () {
					await User.register({ "email": "test@test.com", "password": "secret" })
					try {
							await User.authenticate({ "email": "test@test.com", "password": "secret1" })
					} catch (err) {
							expect(err.message).toEqual("Invalid Credentials");
							expect(err.status).toBe(401)
					}
			})


			test("should return error message if email is wrong", async function () {
					await User.register({ "email": "test@test.com", "password": "secret" })
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
})