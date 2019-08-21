const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

/** Related functions for salaries. */

class Salary {

  /** Find all salaries */

  static async findAll() {
    const result = await db.query(`SELECT 
                                  id, 
                                  salary,
                                  bonus,
                                  equity 
                                FROM salaries`);
    
    return result.rows;
  }

  /** Create a charge (from data), update db, return new charge data. */

  static async create(data) {
    const { salary, bonus, equity } = data;
    const result = await db.query(
      `INSERT INTO salaries (salary, bonus, equity) 
             VALUES ($1, $2, $3) 
             RETURNING id, salary, bonus, equity`,
            [salary, bonus, equity]
    );
    return result.rows[0];
  }

  /** Update salary data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed salary.
   */

  static async update(id, data) {
    let { query, values } = sqlForPartialUpdate(
      "salaries",
      data,
      "id",
      id
    );

    const result = await db.query(query, values);
    const salary = result.rows[0];

    if (!salary) {
      let notFound = new Error(`There exists no salary ${id}`);
      notFound.status = 404;
      throw notFound;
    }

    return salary;
  }

  /** Delete given salary from database; returns id of deleted salary. */

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM salaries 
            WHERE id = $1 
            RETURNING id`,
      [id]);

    if (result.rows.length === 0) {
      let notFound = new Error(`There exists no salary ${id}`);
      notFound.status = 404;
      throw notFound;
    }

    return result.rows[0];
  }
}

module.exports = Salary;