const db = require("../db");

class Newsletter {
  // Create a question from input: {question, id}
  static async register(data) {
    const { email } = data;
    const result = await db.query(
      `INSERT INTO newsletter_emails (email)
      VALUES ($1)`,
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
