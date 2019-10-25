const db = require("../db");

class Salary {
  static async findLatestSalaryByUserId(userId) {
      const result = await db.query(
        `SELECT 
            id,
            user_id,
            salary,
            bonus,
            equity
         FROM salaries
         WHERE user_id=$1
         ORDER BY id desc
         LIMIT 1`, [userId]);
      const salary = result.rows[0];
      if (salary === undefined) {
        throw new Error(`Cannot find a salary for user with userId ${userId}`);
      }
      return salary;
  }

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
