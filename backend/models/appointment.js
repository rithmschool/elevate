const db = require("../db");

class Appointment {
  /** ALL methods need to check for existing user and retrieve user_id using email from calendly
   * If we can't find a user_id, then send an email saying that the meeting will be canceled
   * please try again and be sure to use the same email as elevate account
   * 
   */

  /**  find all appointment data from elevate appointments database
  { appointments: [{
  user_id, 
  first_name, 
  last_name, 
  email, 
  created_at, 
  event_type, 
  event_name,
  start_time_pretty,
  location
  canceled
  }]}
  */

  static async findAll() {
    const result = await db.query(
      `SELECT  user_id, users.first_name, users.last_name, users.email, created_at, event_type, event_type_name, start_time_pretty, location, canceled
      FROM appointments
      JOIN users on users.id = appointments.user_id
      ORDER BY users.last_name
       `);

    let appointments = result.rows;
    return appointments;
  }

  /** find appointments by user email from elevate appointments database
  { appointments: [{
  user_id, 
  first_name, 
  last_name, 
  email, 
  created_at, 
  event_type, 
  event_name,
  start_time_pretty,
  location
  canceled
  }]}
  */

  static async findAppointmentsByUserEmail(email) {

    const result = await db.query(
      `SELECT  user_id, users.first_name, users.last_name, users.email, created_at, event_type, event_type_name, start_time_pretty, location, canceled
      FROM appointments
      JOIN users on users.id = appointments.user_id
      WHERE users.email = $1
       `, [email]);

    let appointments = result.rows[0];

    if (!appointments) {
      const error = new Error(`no appointment for ${email}`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }
    return appointments;
  }

  /**  Insert new calendly object to database
  {event_id, start_time}
  */
  static async create(obj) {

    let user_email = obj.user_email
    const userResult = await db.query(
      `SELECT id
          FROM users
          WHERE email = $1`,
      [user_email]);

    const user = userResult.rows[0];

    if (!user) {
      const error = new Error(`no email matched with  '${user_email}'. Appointment must be rescheduled with correct email`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }

    let queryArray = [user.id,
    obj.event_id,
    obj.calendly_user_id,
    obj.created_at,
    obj.event_type,
    obj.event_type_name,
    obj.reason,
    obj.start_time,
    obj.start_time_pretty,
    obj.end_time,
    obj.end_time_pretty,
    obj.location,
    obj.canceled,
    obj.canceler_name,
    obj.cancel_reason,
    obj.canceled_at,
    obj.old_event_id,
    obj.new_event_id
    ];

    let result;

    try {
      result = await db.query(
        `INSERT INTO appointments 
          (
            user_id, 
            event_id, 
            calendly_user_id, 
            created_at, 
            event_type,
            event_type_name, 
            reason, 
            start_time, 
            start_time_pretty, 
            end_time, 
            end_time_pretty, 
            location, 
            canceled, 
            canceler_name, 
            cancel_reason, 
            canceled_at, 
            old_event_id, 
            new_event_id
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING event_id, start_time`
        , queryArray);

    } catch (err) {
      console.log(err);
    }

    return result.rows[0];
  }

  /**  Update calendly object to database
  {event_id, start_time, canceled}
  */
  static async cancel(obj) {

    let startTime = obj.start_time
    let professionalId = obj.calendly_user_id

    const oldEventResult = await db.query(
      `SELECT event_id, start_time, canceled
          FROM appointments
          WHERE (start_time = $1 AND calendly_user_id = $2)`,
      [startTime, professionalId]);

    const oldEventId = oldEventResult.rows[0];

    if (!oldEventId) {
      const error = new Error(`no record of the appointment.`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }
    const array = [
      oldEventId.event_id,
      obj.canceled,
      obj.canceler_name,
      obj.cancel_reason,
      obj.canceled_at,
    ];

    let result;

    try {
      result = await db.query(
        `UPDATE appointments
          SET canceled = $2,
                  canceler_name = $3 ,
                  cancel_reason = $4,
                  canceled_at = $5 
          WHERE event_id = $1
          RETURNING event_id, start_time, canceled`
        , array);

    } catch (err) {
      console.log(err);
    }

    return result.rows[0];
  }
}

module.exports = Appointment;

