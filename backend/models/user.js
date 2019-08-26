const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");


/**FIXME: work factor is 10 for development purpose. actual recommendation is 15, minimum is 12 */
const BCRYPT_WORK_FACTOR = 10;


/** Related functions for users. */

class User {

  /** authenticate user with email, password. Returns user or throws err. */

  static async authenticate(data) {
    // try to find the user first

    const result = await db.query(
      `SELECT id, 
                email,
                password, 
                is_admin,
                first_name, 
                last_name, 
                current_company,
                hire_date,
                needs,
                goals     
          FROM users 
          WHERE email = $1`,
      [data.email]
    );





    const user = result.rows[0];
    // const hashedPassword = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);



    if (user) {
      // compare hashed password to a new hash from password from user input
      // const hashedPassword = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {

        return user;
      }
    }

    const invalidPass = new Error("Invalid Credentials");
    invalidPass.status = 401;
    throw invalidPass;
  }



  /** Register user with data. Returns new user data. */
  /**NOTE: ask Alex what kind of initial sign up data from new user */
  static async register(data) {
    // check if email is taken or not

    const duplicateCheck = await db.query(
      `SELECT email 
            FROM users 
            WHERE email = $1`,
      [data.email]
    );

    if (duplicateCheck.rows[0]) {
      const err = new Error(
        `There already exists a user with email '${data.email}`);
      err.status = 401;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users 
            (email, password) 
            VALUES ($1, $2) 
            RETURNING id, is_admin`,
      [data.email, hashedPassword]);
    return result.rows[0];
  }

  /** Find all users. */

  static async findAll() {
    const result = await db.query(
      `SELECT id, email, is_admin, first_name, last_name, current_company, hire_date, needs, goals
        FROM users
        ORDER BY last_name`
    );
    return result.rows;
  }

  /** Given a user id, return data about user. */

  static async findOne(id) {
    const result = await db.query(
      `SELECT email, is_admin, first_name, last_name, current_company, hire_date, needs, goals 
        FROM users 
        WHERE id = $1`,
      [id]
    );
    const user = result.rows[0];

    if (!user) {
      throw new Error(`There exists no user with that id`, 404);
    }
    return user;
  }

}

module.exports = User;
