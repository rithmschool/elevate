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
        console.log(user);
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
    const { email, first_name, last_name, password } = data;
    const duplicateCheck = await db.query(
      `SELECT email 
            FROM users 
            WHERE email = $1`,
      [email]
    );

    if (duplicateCheck.rows[0]) {
      const err = new Error(
        `There already exists a user with email '${email}`);
      err.status = 401;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    /* The Sql for registering a user is dynamic based on user inputs. 
    Should looke like:
    INSERT INTO users 
            (email, password ...) 
            VALUES ($1, $2 ...) 
            RETURNING id, is_admin
            */


    // Required fields:
    let sqlQuery = `INSERT INTO users
                    (email, password`
    let queryCount = 2;
    let queryInputs = [email, hashedPassword];

    // Add first name to query if it exists
    if (first_name !== undefined) {
      queryCount++;
      sqlQuery += ", first_name"
      queryInputs.push(first_name);
    }

    // Add last name to query if it exists
    if (last_name !== undefined) {
      queryCount++;
      sqlQuery += ", last_name"
      queryInputs.push(last_name);
    }

    // Close paramaters and initialize VALUES based on required fields:
    sqlQuery += ") VALUES ($1, $2"

    // If the queryCount was added to after the initial required fields, 
    // Add in $n for all added values.
    for (let i = 3; i <= queryCount; i++) {
      sqlQuery += ", $" + (i);
    }

    // Finish building the query:
    sqlQuery += ") RETURNING id, is_admin "
    // End of query builder

    const result = await db.query(sqlQuery, queryInputs);
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
    console.log("user is", user)

    if (!user) {
      console.log("i am here")
      throw new Error(`There exists no user with that id`, 404);
    }
    return user;
  }


  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed user.
   *
   */

  static async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    let { query, values } = partialUpdate("users", data, "id", id);

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {

      throw new Error(`There exists no user with that id`, 404);
    }

    delete user.password;
    delete user.is_admin;

    return result.rows[0];
  }


  /** Delete given user from database; returns undefined. */

  static async remove(id) {
    let result = await db.query(
      `DELETE FROM users 
        WHERE id = $1
        RETURNING first_name, last_name`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error(`There exists no user with that id`, 404);
    }
  }
}




module.exports = User;
