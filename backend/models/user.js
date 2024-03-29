const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");

/** reduce bcrypc rounds in test environemnt **/
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 15;

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

  static async googleLogin(data) {
    let user;

    let existing_user = data.email && await db.query(`SELECT id FROM users WHERE email = $1`, [data.email]);
    // Get user_id from google_users table
    let userId = existing_user.rows[0] && existing_user.rows[0].id;

    let existingGoogleUser = await db.query(`SELECT * FROM google_users WHERE user_id=$1`, [userId]);
    let userGoogleID = existingGoogleUser.rows && existingGoogleUser.rows[0]

    // Check if user_id exists in google_users table, 
    // false: add to google_users table, then return user
    // true: return user
    if (!userGoogleID && userId) {
      await db.query(
        `INSERT INTO google_users
                (user_id, google_id)
                VALUES ($1,$2)
                RETURNING user_id, google_id`,
        [userId, data.sub]
      )

      // Return current user
      user = await User.findOne(userId);
      return user;

    } else if (userGoogleID && userId) {
      user = await User.findOne(userId);
      return user;
    } else if (!userId && !userGoogleID) {
      await db.query(
        `INSERT INTO users 
              (email, password, first_name, last_name) 
              VALUES ($1, $2, $3, $4) 
              RETURNING email, first_name, last_name`,
        [data.email, null, data.given_name, data.family_name]);
      let existing_user = data.email && await db.query(`SELECT id FROM users WHERE email = $1`, [data.email]);
      let userId = existing_user.rows[0] && existing_user.rows[0].id;

      await db.query(
        `INSERT INTO google_users
                (user_id, google_id)
                VALUES ($1,$2)
                RETURNING user_id, google_id`,
        [userId, data.sub]);
      user = await User.findOne(userId);
      return user;
    }
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
        `There already exists a user with email '${data.email}`
      );
      err.status = 401;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users 
            (email, password, first_name, last_name) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, is_admin, first_name, last_name`,
      [data.email, hashedPassword, data.first_name, data.last_name]
    );
    return result.rows[0];
  }

  /** Find all users. Front end logic requires id to be aliased as user_id.
   * e.g., AdminTable component renders user details for each row in any table
   * so it must have a consistent key "user_id"  */

  static async findAll() {
    const result = await db.query(
      `SELECT id AS user_id, 
              first_name, 
              last_name, 
              current_company AS company, 
              hire_date, 
              needs, 
              goals
        FROM users
        ORDER BY id`
    );
    return result.rows;
  }

  /** Given a user id, return data about user. */

  static async findOne(id) {
    const result = await db.query(
      `SELECT id, email, is_admin, first_name, last_name, current_company, hire_date, needs, goals 
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

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed user.
   *
   */

  static async update(id, data) {
    // TODO: FIX THIS eslint disable
    if (data.password) {
      // eslint-disable-next-line require-atomic-updates
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }
    const { query, values } = partialUpdate("users", data, "id", id);

    const result = await db.query(query, values);
    const user = result.rows[0];
    if (!user) {
      throw new Error(`There exists no user with that id`, 404);
    }

    delete user.password;
    delete user.is_admin;
    delete user.reset_password_token;
    delete user.reset_password_expires;

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

  /** Given a user email, return data about user. */
  static async findUserbyEmail(email) {
    const result = await db.query(
      `SELECT id, email, first_name, last_name
        FROM users 
        WHERE email = $1`,
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      throw {
        message: `This user with this email ${email} doesn't exist!`,
        status: 400
      };
    }
    return user;
  }

  /** Given a reset password reset token and check if the token is valid and not expired yet. */
  static async verifyPasswordToken(resetPasswordToken) {
    const result = await db.query(
      `SELECT id, first_name, reset_password_expires
          FROM users 
          WHERE reset_password_token = $1`,
      [resetPasswordToken]
    );
    const user = result.rows[0];
    if (!user) {
      throw { message: `Password reset link is invalid`, status: 400 };
    } else if (user.reset_password_expires < Date.now()) {
      throw { message: `Password reset link has expired`, status: 400 };
    }
    return user;
  }
}

module.exports = User;
