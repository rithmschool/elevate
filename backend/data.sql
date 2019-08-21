DROP DATABASE IF EXISTS "elevate";
CREATE DATABASE "elevate";
\c "elevate"

CREATE TABLE salaries (
  id serial PRIMARY KEY,
  salary FLOAT,
  bonus FLOAT,
  equity FLOAT
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  first_name TEXT,
  last_name TEXT,
  current_company TEXT,
  salary INTEGER REFERENCES salaries (id) ON DELETE CASCADE,
  hire_date DATE,
  needs TEXT,
  goals TEXT
);

CREATE TABLE charges (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users,
  amount FLOAT NOT NULL,
  description TEXT,
  due_date DATE,
  payment_date DATE,
  paid BOOLEAN DEFAULT FALSE
);

INSERT INTO salaries (id, salary, bonus, equity) VALUES
  (1, 150000.00, 25000.00, .001),
  (2, 100000.00, 5000.00, .005),
  (3, 90000.00, 2000.00, .0035),
  (4, 200000.00, 5000.00, .33),
  (5, 200000.00, 5000.00, .10);


INSERT INTO users (id, email, password, is_admin, first_name, last_name, current_company, salary, hire_date, needs, goals) VALUES
  (1, 'testuser@gmail.com', '$2b$15$ExKP/7DNP7QFfuB/qtYcq.hGLtdoACyZ3eo1gsqDS.a4aOB9fxd1q', false, 'Test', 'User', 'Google', 1, '2018-06-23', 'Talk to financial advisor about salary/equity negotiations.', 'Increase in equity.'),
  (2, 'admin@gmail.com', '$2b$15$h41Q75sz0ltHjCHZyP1.Hu8ATrj55t2kFExvEdeYireFgGDYsUiye', true, 'Admin', 'User', '', 2, '2019-06-23', '', ''),
  (3, 'nate@gmail.com', 'nate123', false, 'Nate', 'Lipp', 'Rithm', 3, '2019-06-23', 'Get help from a lawyer.', 'Increase in salary.'),
  (4, 'elie@gmail.com', 'elie123', false, 'Elie', 'Schoppik', 'Rithm', 4, '2017-06-01', 'Talk to financial advisor to calculate how many instructors he can hire.', 'Recruit more instructors.'),
  (5, 'joel@gmail.com', 'joel123', false, 'Joel', 'Burton', 'Rithm', 5, '2017-08-23', 'General investment advice', 'Help bootcamp grads negotiate.');

INSERT INTO charges (id, user_id, amount, description, due_date, payment_date, paid) VALUES 
  (1, 1, 500.00, 'Percentage of negotiation salary.', '2019-10-02', null, false),
  (2, 3, 1000.99, 'Percentage of negotiation salary.', '2019-09-01', '2019-08-20', true),
  (3, 3, 500.00, 'Percentage of negotiation salary.', '2019-08-23', null, false),
  (4, 4, 750.00, 'Percentage of negotiation salary.', '2019-11-13', null, false),
  (5, 5, 1000.00, 'Percentage of negotiation salary.', '2019-08-28', null, false);


/* upcoming */ 
/* CREATE TABLE messages (); */
/* CREATE TABLE appointments (); */
/* CREATE TABLE templates (); */



-- Create test database with tables

DROP DATABASE IF EXISTS "elevate-test";
CREATE DATABASE "elevate-test";
\c "elevate-test"

CREATE TABLE salaries (
  id serial PRIMARY KEY,
  salary FLOAT,
  bonus FLOAT,
  equity FLOAT
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  first_name TEXT,
  last_name TEXT,
  current_company TEXT,
  salary INTEGER REFERENCES salaries (id) ON DELETE CASCADE,
  hire_date DATE,
  needs TEXT,
  goals TEXT
);

CREATE TABLE charges (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users,
  amount FLOAT NOT NULL,
  description TEXT,
  due_date DATE,
  payment_date DATE,
  paid BOOLEAN DEFAULT FALSE
);