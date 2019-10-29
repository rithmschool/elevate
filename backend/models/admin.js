const db = require("../db");

class Admin {
  static async getAllDocuments() {
    const result = await db.query(
      `SELECT * FROM documents
        ORDER BY user_id`
    );
    let documents = result.rows;
    return documents;
  }
}

module.exports = Admin;
