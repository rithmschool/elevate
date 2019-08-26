const db = require("../db");

/** Related functions for salaries. */

class Salary {

  /** Find all salaries */

  static async findAll() {
    const result = await db.query(`SELECT 
                                  id,
                                  user_id,
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
      const salary = result.rows[0];
      if (salary === undefined) {
        throw new Error(`Cannot find a salary for user with userId ${id}`);
      }
      return salary;
  }

  /** Create a salary (from data), update db, return new salary data. */

  static async create(data) {
    const { user_id, salary, bonus, equity } = data;
    if (user_id === undefined) {
      return new Error("UserId is undefined");
    }
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
   * As a result each salary update will create a new salary entry in the DB.
   * @param int userId 
   * @param object data 
   */
  static async updateWithUserId(userId, data) {
    try {
      let latestSalary = await this.findLatestSalaryByUserId(userId);
      let updatedSalary = { ...latestSalary, ...data }
      return this.create(updatedSalary);
    } catch(err) {
      return new Error(`There exists no salary for user ${userId}`);
    }
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