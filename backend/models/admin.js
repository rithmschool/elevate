const db = require("../db");

class Admin {
  static async getAllDocuments() {
    const result = await db.query(`SELECT * FROM documents`);
    let documents = result.rows;
    return documents;
  }
}

module.exports = Admin;
