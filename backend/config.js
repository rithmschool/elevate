/** Shared config for application; can be required in many places. */

require("dotenv").config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3001;

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "elevate-test";
} else {
  DB_URI = process.env.DATABASE_URL || 'elevate';
}

console.log("Using database", DB_URI);

const SEED_USER_SQL = `
  INSERT INTO users (email, password, is_admin, first_name, last_name, current_company, hire_date, needs, goals) VALUES
    ('testuser@gmail.com', 'password123', false, 'Test', 'User', 'Google', '2018-06-23', 'Talk to financial advisor about salary/equity negotiations.', 'Increase in equity.'),
    ('admin@gmail.com', 'admin123', true, 'Admin', 'User', '', '2019-06-23', '', ''),
    ('nate@gmail.com', 'nate123', false, 'Nate', 'Lipp', 'Rithm', '2019-06-23', 'Get help from a lawyer.', 'Increase in salary.'),
    ('elie@gmail.com', 'elie123', false, 'Elie', 'Schoppik', 'Rithm', '2017-06-01', 'Talk to financial advisor to calculate how many instructors he can hire.', 'Recruit more instructors.'),
    ('joel@gmail.com', 'joel123', false, 'Joel', 'Burton', 'Rithm', '2017-08-23', 'General investment advice', 'Help bootcamp grads negotiate.');`

const SEED_SALARY_SQL = `
  INSERT INTO salaries (user_id, salary, bonus, equity) VALUES
    (1, 150000.00, 25000.00, .001),
    (2, 100000.00, 5000.00, .005),
    (3, 90000.00, 2000.00, .0035),
    (4, 200000.00, 5000.00, .33),
    (5, 200000.00, 5000.00, .10);`

const SEED_CHARGES_SQL = `
  INSERT INTO charges (user_id, amount, description, due_date, payment_date, paid) VALUES
    (1, 500.00, 'Percentage of negotiation salary.', '2019-10-02', null, false),
    (3, 1000.99, 'Percentage of negotiation salary.', '2019-09-01', '2019-08-20', true),
    (3, 500.00, 'Percentage of negotiation salary.', '2019-08-23', null, false),
    (4, 750.00, 'Percentage of negotiation salary.', '2019-11-13', null, false),
    (5, 1000.00, 'Percentage of negotiation salary.', '2019-08-28', null, false);`

module.exports = {
  SECRET,
  PORT,
  DB_URI,
  SEED_USER_SQL,
  SEED_SALARY_SQL,
  SEED_CHARGES_SQL,
};