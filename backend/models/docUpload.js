const db = require("../db");

class DocUploads {
  static async add(data) {
    const { title, counterparty, status, date_reviewed, url, user_id } = data;

    const result = await db.query(
      `INSERT INTO documents (title, counterparty, status, date_reviewed, url, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, title, counterparty, status, date_submitted, date_reviewed, url, user_id`,
      [title, counterparty, status, date_reviewed, url, user_id]
    );

    return result.rows[0];
  }
}

module.exports = DocUploads;
