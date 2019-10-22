const db = require("../db");

class Document {
  static async getAll(userId) {
    const result = await db.query(
      `SELECT id, title, counterparty, date_reviewed, status
    FROM documents
    WHERE user_id=$1`,
      [userId]
    );

    return result.rows;
  }
}

module.exports = Document;
