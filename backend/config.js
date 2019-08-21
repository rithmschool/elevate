/** Shared config for application; can be required in many places. */

require("dotenv").config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3001;

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "elevate-test";
} else {
  DB_URI  = process.env.DATABASE_URL || 'elevate';
}

console.log("Using database", DB_URI);

const SEED_DB_SQL = `
  INSERT INTO salaries (id, salary, bonus, equity) VALUES
    (1, 150000.00, 25000.00, .001),
    (2, 100000.00, 5000.00, .005),
    (3, 90000.00, 2000.00, .0035),
    (4, 200000.00, 5000.00, .33),
    (5, 200000.00, 5000.00, .10);
  
  INSERT INTO users (id, email, password, is_admin, first_name, last_name, current_company, salary, hire_date, needs, goals) VALUES
    (1, 'testuser@gmail.com', 'password123', false, 'Test', 'User', 'Google', 1, '2018-06-23', 'Talk to financial advisor about salary/equity negotiations.', 'Increase in equity.'),
    (2, 'admin@gmail.com', 'admin123', true, 'Admin', 'User', '', 2, '2019-06-23', '', ''),
    (3, 'nate@gmail.com', 'nate123', false, 'Nate', 'Lipp', 'Rithm', 3, '2019-06-23', 'Get help from a lawyer.', 'Increase in salary.'),
    (4, 'elie@gmail.com', 'elie123', false, 'Elie', 'Schoppik', 'Rithm', 4, '2017-06-01', 'Talk to financial advisor to calculate how many instructors he can hire.', 'Recruit more instructors.'),
    (5, 'joel@gmail.com', 'joel123', false, 'Joel', 'Burton', 'Rithm', 5, '2017-08-23', 'General investment advice', 'Help bootcamp grads negotiate.');
    
  INSERT INTO charges (user_id, amount, description, due_date, payment_date, paid) VALUES 
    (1, 500.00, 'Percentage of negotiation salary.', '2019-10-02', null, false),
    (2, 1000.99, 'Percentage of negotiation salary.', '2019-09-01', '2019-08-20', true),
    (3, 500.00, 'Percentage of negotiation salary.', '2019-08-23', null, false),
    (4, 750.00, 'Percentage of negotiation salary.', '2019-11-13', null, false),
    (5, 1000.00, 'Percentage of negotiation salary.', '2019-08-28', null, false);
    
  INSERT INTO charges (id, user_id, amount, description, due_date, payment_date, paid) VALUES
  (999999, 1, 500.00, 'Percentage of negotiation salary.', '2019-10-02', null, false);`

module.exports = {
  SECRET,
  PORT,
  DB_URI,
  SEED_DB_SQL,
};