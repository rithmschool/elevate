const db = require("../db");

// Related functions for questions

class Question {

  // Create a question from input: {question, id}
  static async create(question, id) {
    const result = await db.query(
      `INSERT INTO questions (question, user_id)
      VALUES ($1, $2)`,
      [question, id]
    );
    return result.rows[0];
  }
}



module.exports = Question;