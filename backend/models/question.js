const db = require("../db");

class Question {

  // Create a question from input: {question: "", email: ""}
  static async create(data) {
    const { question, email } = data
    const result = await db.query(
      `INSERT INTO questions (question, email)
      VALUES ($1, $2)`,
      [question, email]
    );
    return result.rows[0];
  }


  /** Find all questions. */
  static async findAll() {
    const result = await db.query(
      `SELECT user_id, question, resolved, email, first_name, last_name, created_date
      FROM users
      JOIN questions ON user_id=users.id`
    );
    return result.rows;
  }
}
module.exports = Question;