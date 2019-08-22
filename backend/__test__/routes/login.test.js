process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const db = require("../../db");

const { SEED_DB_SQL } = require("../../config")
const bcrypt = require("bcrypt");


describe("routes for login", function () {
  beforeEach(async function () {
    await db.query(`DELETE FROM charges;`);
		await db.query(`DELETE FROM users;`);
		await db.query(`DELETE FROM salaries;`);
		await db.query(SEED_DB_SQL)
    
  })

  afterEach(async function () {
    await db.query(`DELETE FROM charges;`);
		await db.query(`DELETE FROM users;`);
		await db.query(`DELETE FROM salaries;`);
   
  });

  describe("POST /login", function () {
    test("It should have property of token", async function () {
     
      const inputPassword = 'password123'
			const inputEmail = 'testuser@gmail.com'
      const hashedPassword = await bcrypt.hash(inputPassword, 10)
     
					// updating plain password to hashed password
          await db.query(`UPDATE users 
                                   SET password= $1 
                                   WHERE email= $2;`,
                                   [hashedPassword, inputEmail]);
      
      const response = await request(app)
        .post("/login")
        .send({ "email": inputEmail, "password": inputPassword })
      expect(response.body.token).not.toBe(undefined)
     })
  })

  describe("POST /login", function () {
  
    test("It should give an error of invalid credential when email is not valid", async function () {
      const inputPassword = 'password123'
			const inputEmail = 'testuser@gmail.com'
      const hashedPassword = await bcrypt.hash(inputPassword, 10)
     
					// updating plain password to hashed password
          await db.query(`UPDATE users 
                                   SET password= $1 
                                   WHERE email= $2;`,
                                   [hashedPassword, inputEmail]);
      const response = await request(app)
        .post("/login")
        .send({ "email": 'testuse1r@gmail.com', "password": inputPassword })
      expect(response.body).toEqual({"message": "Invalid Credentials", "status": 401})
    })
  })

  describe("POST /login", function () {
    test("It should give an error of invalid credential when password is not valid", async function () {
      const inputPassword = 'password123'
			const inputEmail = 'testuser@gmail.com'
      const hashedPassword = await bcrypt.hash(inputPassword, 10)
     
					// updating plain password to hashed password
          await db.query(`UPDATE users 
                                   SET password= $1 
                                   WHERE email= $2;`,
                                   [hashedPassword, inputEmail]);
     
      const response = await request(app)

        .post("/login")
        .send({ "email": inputEmail, "password": "secret" })
      expect(response.body).toEqual({"message": "Invalid Credentials", "status": 401})
    })
  })
})

afterAll(async function () {
  await db.end();
});