const db = require("../db");

class DocUploads {
  static async upload(data) {
    const { title, counterparty, status, date_reviewed } = data;

    const result = await db.query(
      `INSERT INTO documents (title, counterparty, status, date_reviewed)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title, counterparty, status, date_submitted, date_reviewed`,
      [title, counterparty, status, date_reviewed]
    );

    return result.rows[0];
  }
}

module.exports = DocUploads;
