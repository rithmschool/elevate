/**FIX  ME: CONFIG DB */
const bcrypt = require("bcrypt");

/**NOTE: recommended work factor is 15. minimum is 12. it can be lowered if it too slow */
const BCRYPT_WORK_FACTOR = 15;


/** Related functions for users. */

class User {

    /** authenticate user with email, password. Returns user or throws err. */

    static async authenticate(data) {
        // try to find the user first
        const result = await db.query(
            `SELECT id, 
                email,
                password, 
                is_admin,
                first_name, 
                last_name, 
                current_company,
                salary, 
                hire_date,
                needs,
                goals     
          FROM users 
          WHERE email = $1`,
            [data.email]
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(data.password, user.password);
            if (isValid) {
                return user;
            }
        }

        const invalidPass = new Error("Invalid Credentials");
        invalidPass.status = 401;
        throw invalidPass;
    }

    /** Register user with data. Returns new user data. */
    /**NOTE: ask Alex what kind of initial sign up data from new user */
    static async register(data) {
        // check if email is taken or not
        const duplicateCheck = await db.query(
            `SELECT email 
            FROM users 
            WHERE email = $1`,
            [data.email]
        );

        if (duplicateCheck.rows[0]) {
            const err = new Error(
                `There already exists a user with email '${data.email}`);
            err.status = 409;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users 
            (email, password) 
            VALUES ($1, $2) 
            RETURNING id, is_admin`,
            [
                data.email,
                hashedPassword
            ]);

        return result.rows[0];
    }


}


module.exports = User;