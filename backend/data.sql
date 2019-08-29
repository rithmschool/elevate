DROP DATABASE IF EXISTS "elevate";
CREATE DATABASE "elevate";
\c "elevate"

CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  first_name TEXT,
  last_name TEXT,
  current_company TEXT,
  hire_date DATE,
  needs TEXT,
  goals TEXT
);

CREATE TABLE salaries (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  salary FLOAT,
  bonus FLOAT,
  equity FLOAT,
  created_at TIMESTAMP DEFAULT current_timestamp,
  last_modified TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE charges (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  amount FLOAT NOT NULL,
  description TEXT,
  due_date DATE,
  payment_date DATE,
  paid BOOLEAN DEFAULT FALSE
);

CREATE TABLE questions (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  question TEXT NOT NULL,
  response TEXT,
  responder INTEGER REFERENCES users (id),
  resolved BOOLEAN DEFAULT FALSE
);

-- FIXED:  deleted handcode ID because issue with primary key constrain when create new user
INSERT INTO users ( email, password, is_admin, first_name, last_name, current_company, hire_date, needs, goals) VALUES
  ('testuser@gmail.com', 'password123', false, 'Test', 'User', 'Google', '2018-06-23', 'Talk to financial advisor about salary/equity negotiations.', 'Increase in equity.'),
  ('admin@gmail.com', '$2b$10$fQ8KUCFVMG9IEEWsOGuOheEISwVgLbLhDWGaXl99r1ZpIdiISxUvK', true, 'Admin', 'User', '', '2019-06-23', '', ''),
  ('nate@gmail.com', 'nate123', false, 'Nate', 'Lipp', 'Rithm', '2019-06-23', 'Get help from a lawyer.', 'Increase in salary.'),
  ('elie@gmail.com', 'elie123', false, 'Elie', 'Schoppik', 'Rithm', '2017-06-01', 'Talk to financial advisor to calculate how many instructors he can hire.', 'Recruit more instructors.'),
  ('joel@gmail.com', 'joel123', false, 'Joel', 'Burton', 'Rithm', '2017-08-23', 'General investment advice', 'Help bootcamp grads negotiate.');

INSERT INTO salaries (user_id, salary, bonus, equity) VALUES
  (1, 150000.00, 25000.00, .001),
  (2, 100000.00, 5000.00, .005),
  (3, 90000.00, 2000.00, .0035),
  (4, 200000.00, 5000.00, .33),
  (5, 200000.00, 5000.00, .10);

INSERT INTO charges (user_id, amount, description, due_date, payment_date, paid) VALUES
  (1, 500.00, 'Percentage of negotiation salary.', '2019-10-02', null, false),
  (3, 1000.99, 'Percentage of negotiation salary.', '2019-09-01', '2019-08-20', true),
  (3, 500.00, 'Percentage of negotiation salary.', '2019-08-23', null, false),
  (4, 750.00, 'Percentage of negotiation salary.', '2019-11-13', null, false),
  (5, 1000.00, 'Percentage of negotiation salary.', '2019-08-28', null, false);

INSERT INTO questions (email, question) VALUES
('testuser@gmail.com', 'My employer didnt pay me!'),
('nate@gmail.com', 'My employer wants to pay me too much!'),
('notAuser@gmail.com', 'How do I negotiate my contract?');

/* upcoming */
/* CREATE TABLE messages (); */
/* CREATE TABLE appointments (); */
/* CREATE TABLE templates (); */



-- Create test database with tables

DROP DATABASE IF EXISTS "elevate-test";
CREATE DATABASE "elevate-test";
\c "elevate-test"

CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  first_name TEXT,
  last_name TEXT,
  current_company TEXT,
  hire_date DATE,
  needs TEXT,
  goals TEXT
);

CREATE TABLE salaries (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  salary FLOAT,
  bonus FLOAT,
  equity FLOAT,
  created_at TIMESTAMP DEFAULT current_timestamp,
  last_modified TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE charges (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  amount FLOAT NOT NULL,
  description TEXT,
  due_date DATE,
  payment_date DATE,
  paid BOOLEAN DEFAULT FALSE
);

