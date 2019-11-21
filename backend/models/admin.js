const db = require("../db");

class Admin {
  static async getAllDocuments() {
    const result = await db.query(
      `SELECT * FROM documents
        ORDER BY user_id`
    );
    let documents = result.rows;
    if (!documents) {
      throw new Error("Can't find any documents.");
    }
    return documents;
  }
}

module.exports = Admin;
