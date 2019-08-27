const db = require("../db");

// Related functions for questions

class Question {

  // Create a question from input: {question, email}
  static async create(data) {
    const { question, user_email } = data;
    const result = await db.query(
      `INSERT INTO questions (question, user_email)
      VALUES ($1, $2)`,
      [question, user_email]
    );
    return result.rows[0];
  }
}



module.exports = Question;