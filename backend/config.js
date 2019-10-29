/** Shared config for application; can be required in many places. */

require("dotenv").config();

const SECRET = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 3001;

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || `elevate2super@gmail.com`;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || `elevate2super12345`;
const FROM_EMAIL = `superAgent@gmail.com`;
const SERVICE = "gmail";
const EXPIRE_TIME = 3600000; // 1 hour

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "elevate-test";
} else {
  DB_URI = process.env.DATABASE_URL || "elevate";
}

console.log("Using database", DB_URI);

const SEED_USER_SQL = `
  INSERT INTO users (email, password, is_admin, first_name, last_name, current_company, hire_date, needs, goals, reset_password_token, reset_password_expires) VALUES
    ('testuser@gmail.com', 'password123', false, 'Test', 'User', 'Google', '2018-06-23', 'Talk to financial advisor about salary/equity negotiations.', 'Increase in equity.','', ''),
    ('admin@gmail.com', 'admin123', true, 'Admin', 'User', '', '2019-06-23', '', '', '', ''),
    ('nate@gmail.com', 'nate123', false, 'Nate', 'Lipp', 'Rithm', '2019-06-23', 'Get help from a lawyer.', 'Increase in salary.', '', ''),
    ('elie@gmail.com', 'elie123', false, 'Elie', 'Schoppik', 'Rithm', '2017-06-01', 'Talk to financial advisor to calculate how many instructors he can hire.', 'Recruit more instructors.', '', ''),
    ('joel@gmail.com', 'joel123', false, 'Joel', 'Burton', 'Rithm', '2017-08-23', 'General investment advice', 'Help bootcamp grads negotiate.', '','');`;

const SEED_SALARY_SQL = `
  INSERT INTO salaries (user_id, salary, bonus, equity) VALUES
    (1, 150000.00, 25000.00, .001),
    (2, 100000.00, 5000.00, .005),
    (3, 90000.00, 2000.00, .0035),
    (4, 200000.00, 5000.00, .33),
    (5, 200000.00, 5000.00, .10);`;

const SEED_CHARGES_SQL = `
  INSERT INTO charges (user_id, amount, description, due_date, payment_date, paid) VALUES
    (1, 500.00, 'Percentage of negotiation salary.', '2019-10-02', null, false),
    (3, 1000.99, 'Percentage of negotiation salary.', '2019-09-01', '2019-08-20', true),
    (3, 500.00, 'Percentage of negotiation salary.', '2019-08-23', null, false),
    (4, 750.00, 'Percentage of negotiation salary.', '2019-11-13', null, false),
    (5, 1000.00, 'Percentage of negotiation salary.', '2019-08-28', null, false);`;

const SEED_APPT_SQL = `
INSERT INTO appointments (user_id, event_id, calendly_user_id, created_at, event_type, event_type_name, reason, admin_notes, start_time, start_time_pretty, end_time, end_time_pretty, location, canceled, canceler_name, cancel_reason, canceled_at, old_event_id, new_event_id) VALUES
  (3, 'BCHFF2F62BWNJVPP', 'ABCFF2F62BWNJVPP', '2020-08-29T09:15:00-07:00', 'One-on-One', '30 Minute Meeting', 'legal advice', null, '2020-08-31T09:15:00-07:00', '09:15 am - Saturday, August 31, 2020', '2020-08-31T09:45:00-07:00','09:45 am - Saturday, August 31, 2020', 'Zoom', false, null, null, null, null, null),
  (3, 'GCIEBYAHGKWNENHS', 'BCHFF2F62BWNJVPP', '2020-08-27T14:00:29-07:00', 'One-on-One', '15 Minute Meeting', 'consult with a lawyer', null, '2020-08-30T14:00:29-07:00','02:00 pm - Friday, August 30, 2020', '2020-08-30T14:15:29-07:00', '02:15 pm - Friday, August 30, 2020', 'Zoom', false, null, null, null, null, null),
  (3, 'AAFOAUQKKVOBSZVD', 'BCHFF2F62BWNJVPP', '2020-08-27T16:30:00-07:00', 'One-on-One', '30 Minute Meeting', 'negotiate my salary', null, '2020-09-02T16:30:00-07:00', '04:30 pm - Moday, September 2, 2020', '2020-09-02T17:00:00-07:00',  '05:00 pm - Moday, September 2, 2020','Zoom', false, null, null, null, null, null),
  (4, 'EGMBBYHHDUZTVUKA', 'BCHFF2F62BWNJVPP', '2020-08-27T12:01:01-07:00', 'One-on-One', '60 Minute Meeting', 'legal advice', null, '2020-08-29T16:30:00-07:00', '04:30 pm - Thursday, August 29, 2020', '2020-08-29T17:30:00-07:00', '04:30 pm - Thursday, August 29, 2020','Zoom', true, 'Emi Tsukuda', 'too many meetings', '2020-08-29T09:15:00-07:00', 'BCHFF2F62BWNJVZZ', null),
  (5, 'FDLGUGK6SOB54B3G', 'BCHFF2F62BWNJVPP', '2020-08-27T14:00:29-07:00', 'One-on-One', '30 Minute Meeting', 'consult with a lawyer', null, '2020-08-30T11:30:00-07:00', '11:30 am - Friday, August 30, 2020','2020-08-30T12:00:00-07:00', '12:00 pm - Friday, August 30, 2020','Zoom', true, 'Stephanie Simms', 'meetings hate em', '2020-08-28T09:15:00-07:00', 'BCHFF2F62BWNJVAA', null);`;

const SEED_DOCUMENTS_SQL = `
  INSERT INTO documents (title, counterparty, date_submitted, date_reviewed, url, user_id, status)
    VALUES
    ('contract1.pdf', 'Bill Billson', '2020-10-20T04:32:00', null, 'www.conctractz.com/contract1', 1, 'unreviewed'),
    ('contract2.pdf', 'Bill Billson', '2020-10-29T13:37:00', null, 'www.conctractz.com/contract2', 1, 'unreviewed'),
    ('contract3.pdf', 'Bill Billson', '2020-10-23T19:39:00', '2020-10-24T12:00:00', 'www.conctractz.com/contract3', 2, 'reviewed'),
    ('contract4.pdf', 'Bill Billson', '2020-10-29T13:33:00', null, 'www.conctractz.com/contract4', 3, 'unreviewed'),
    ('contract5.pdf', 'Bill Billson', '2020-10-22T11:31:00', null, 'www.conctractz.com/contract5', 4, 'unreviewed')
    `;

// NOTE: currently not used in any test but it is for future use
const SEED_USERS_CALENDLY_USERS_SQL = `INSERT INTO users_calendly_users (user_id, calendly_user_id) VALUES
  (1, 'ABCFF2F62BWNJVPP'),
  (2, 'BCHFF2F62BWNJVPP');`;

module.exports = {
  SECRET,
  PORT,
  DB_URI,
  SEED_USER_SQL,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  FROM_EMAIL,
  EXPIRE_TIME,
  SERVICE,
  SEED_SALARY_SQL,
  SEED_CHARGES_SQL,
  SEED_APPT_SQL,
  SEED_USERS_CALENDLY_USERS_SQL,
  SEED_DOCUMENTS_SQL
};
