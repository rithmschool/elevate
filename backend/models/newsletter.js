const db = require("../db");

class Newsletter {
  // Find if an email exists in DB
  static async findOne(data) {
    const { email } = data;
    const result = await db.query(
      `SELECT email
        FROM newsletter_emails 
        WHERE email = $1`,
      [email]
    );
    if (result.rows[0]) {
      return `Email already exists`;
    }
    return result.rows[0];
  }

  // Create a newsletter email from input: {email}
  static async register(data) {
    const { email } = data;
    const result = await db.query(
      `INSERT INTO newsletter_emails (email)
      VALUES ($1)
      RETURNING email`,
      [email]
    );
    return result.rows[0];
  }
  /** TODO Find all emails signed up for newsletters. */
  // static async findAll() {
  //   const result = await db.query(
  //     `SELECT email
  //     FROM newsletter_emails`
  //   );
  //   return result.rows;
  // }
}
module.exports = Newsletter;
