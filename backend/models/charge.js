const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

/** Related functions for companies. */

class Charge {

  /** Find all charges */

  static async findAll() {
    let result = `SELECT 
                  id, 
                  user_id, 
                  amount, 
                  description, 
                  due_date, 
                  payment,
                  paid 
                 FROM charges`;

    return result.rows;
  }
  
  /** Create a jchargeob (from data), update db, return new charge data. */

  static async create(data) {
    const { user_id, amount, description, due_date, payment_date} = data;

    const result = await db.query(
        `INSERT INTO charges (user_id, amount, description, due_date, payment_date) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING user_id, amount, description, due_date, payment_date`,
        [user_id, amount, description, due_date, payment_date]
    );

    return result.rows[0];
  }

  /** Update charge data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed charge.
   */

  static async update(id, data) {
    let {query, values} = sqlForPartialUpdate(
        "charges",
        data,
        "id",
        id
    );

    const result = await db.query(query, values);
    const charge = result.rows[0];

    if (!charge) {
      let notFound = new Error(`There exists no charge '${id}`);
      notFound.status = 404;
      throw notFound;
    }

    return charge;
  }

  /** Delete given charge from database; returns undefined. */

  static async remove(id) {
    const result = await db.query(
        `DELETE FROM charges 
            WHERE id = $1 
            RETURNING id`,
        [id]);

    if (result.rows.length === 0) {
      let notFound = new Error(`There exists no charge '${id}`);
      notFound.status = 404;
      throw notFound;
    }
  }
}

module.exports = Charge;