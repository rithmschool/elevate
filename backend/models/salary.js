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

  /** Find latest salary */

  static async findLatestSalaryByUserId(id) {
    const result = await db.query(`SELECT 
                                  user_id,
                                  salary,
                                  bonus,
                                  equity
                                FROM salaries
                                WHERE user_id=$1
                                ORDER BY last_modified
                                LIMIT 1`, [id]);

    return result.rows[0];
  }

  /** Create a salary (from data), update db, return new salary data. */

  static async create(data) {
    const { user_id, salary, bonus, equity } = data;
    const result = await db.query(
      `INSERT INTO salaries (user_id, salary, bonus, equity) 
             VALUES ($1, $2, $3, $4) 
             RETURNING id, user_id, salary, bonus, equity`,
            [user_id, salary, bonus, equity]
    );
    return result.rows[0];
  }

  /**
   * This method updates the salary by finding the latest salary of the user,
   * updating the relevant fields with the new data and then creating a new record.
   * Hence each salary update will create a new salary entry in the DB.
   * @param int userId 
   * @param object data 
   */
  static async updateWithUserId(userId, data) {

    let latestSalary = await this.findLatestSalaryByUserId(userId);
    let updatedSalary = { ...latestSalary, ...data}

    console.log(updatedSalary)

    let newSalary = await this.create(updatedSalary);
    console.log(newSalary);
    return newSalary;

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