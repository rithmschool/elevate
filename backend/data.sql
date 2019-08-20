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
  goals TEXT,
);

CREATE TABLE salaries (
  id serial PRIMARY KEY,
  salary FLOAT,
  bonus FLOAT,
  equity FLOAT,
);

CREATE TABLE charges (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users,
  amount FLOAT NOT NULL,
  due_date DATE,
  payment_date DATE,
  paid BOOLEAN DEFAULT FALSE,
);

/* upcoming */ 
/* CREATE TABLE professionals (); */
/* CREATE TABLE roles (); */
/* CREATE TABLE messages (); */
/* CREATE TABLE templates (); */
/* CREATE TABLE appointments (); */
/* CREATE TABLE questions (); */
