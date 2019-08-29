const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const stripe = require("stripe")("sk_test_lj6clGfUw1ahBaCmYYEx5xGV00LKA2Lv4W");

/** Related functions for charges. */
class Charges {

    /** Find all charges */
    /**FIXME: ADD IN A WAY TO SEARCH ONLY OUTSTANDING */
    static async findAll() {
        const result = await db.query(
            `SELECT id,user_id,amount,description,due_date,payment_date,paid 
        FROM charges`);
        return result.rows;
    }
    /**get charges due for a user */
    static async findChargesDue(userId) {
        if (userId === undefined) {
            return new Error("UserId is undefined");
        }
        const result = await db.query(
            `SELECT charges.id, user_id, amount, description, due_date
       FROM charges
      RIGHT JOIN users ON charges.user_id = users.id
      WHERE user_id = $1
      AND paid = 'f'`,
            [userId]
        );

        if (result.rows.length === 0) {
            return "No outstanding charges"
        }

        return result.rows;

    }

    static async getCharge(chargeId) {
        /**if payed or not */
        const result = await db.query(
            `SELECT id, amount, description
            FROM charges
            WHERE id = $1
            AND paid ='f'`,
            [chargeId]
        );
        return result.rows[0];
    }

    static async makeStripePayment(chargeDetails, token) {

        let { status } = await stripe.charges.create({
            amount: chargeDetails.amount,
            currency: "usd",
            description: chargeDetails.description,
            source: token
        });
        return status;
    }
    /** Create a charge (from data), update db, return new charge data. */
    static async create(data) {
        const result = await db.query(
            `INSERT INTO charges (user_id, amount, description, due_date) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, user_id, amount, description, due_date`,
            [data.user_id, +data.amount, data.description, data.due_date]
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
        let { query, values } = sqlForPartialUpdate(
            "charges",
            data,
            "id",
            id
        );

        const result = await db.query(query, values);
        const charge = result.rows[0];


        if (!charge) {
            let notFound = new Error(`There exists no charge ${id}`);
            notFound.status = 404;
            throw notFound;
        }
        return charge;
    }

    /** Delete given charge from database; returns id of deleted charge. */
    static async remove(id) {
        console.log("ID,id")
        const result = await db.query(
            `DELETE FROM charges 
         WHERE id = $1 
         RETURNING id`,
            [id]);

        console.log(result.rows)
        if (result.rows === 0) {
            console.log("mdsf")
            let notFound = new Error(`There exists no charge ${id}`);
            notFound.status = 404;
            throw notFound;
        }
        console.log(result.rows[0])
        return result.rows[0];
    }

}




module.exports = Charges;