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
      `SELECT questions.id AS question_id, users.id AS user_id, question, resolved, questions.email, first_name, last_name, created_date
      FROM users
      RIGHT JOIN questions ON users.email=questions.email;`
    );
    return result.rows;
  }
}
module.exports = Question;