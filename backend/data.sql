DROP DATABASE IF EXISTS "elevate";
CREATE DATABASE "elevate";
\c "elevate"

ALTER DATABASE "elevate" SET timezone='US/Pacific';

CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT,
  reset_password_token TEXT,
  reset_password_expires TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  first_name TEXT,
  last_name TEXT,
  current_company TEXT,
  hire_date DATE,
  needs TEXT,
  goals TEXT
);

CREATE TABLE google_users (
  google_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
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
 user_id INTEGER NOT NULL REFERENCES users (id)  ON DELETE CASCADE,
 question TEXT NOT NULL,
 response TEXT,
 responder INTEGER REFERENCES users (id),
 resolved BOOLEAN DEFAULT FALSE,
 created_date TIMESTAMP DEFAULT current_timestamp
);

-- More data available from calendly webhook response. 
-- These are required and other potentially useful fields for elevate.
-- event_type can be "One-on-One" or "Group" 

-- Rescheduling an appt in calendly results in canceled: true for original event and creation of new event record
-- This is cross referenced as the old_event_id and new_event_id

-- Changed timestamp to text so that we can query record using value from calendly obj 
-- calendly server generates timestamps
CREATE TABLE appointments (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  event_id TEXT NOT NULL,
  calendly_user_id TEXT NOT NULL,
  created_at TEXT,
  event_type TEXT,
  event_type_name TEXT,
  reason TEXT,
  admin_notes TEXT DEFAULT NULL,
  start_time TEXT NOT NULL,
  start_time_pretty TEXT NOT NULL,
  end_time TEXT NOT NULL,
  end_time_pretty TEXT NOT NULL,
  location TEXT,
  canceled BOOLEAN NOT NULL,
  canceler_name TEXT,
  cancel_reason TEXT,
  canceled_at TEXT,
  old_event_id TEXT,
  new_event_id TEXT
);

-- Table for associating elevate user id with calendly user ids
-- Use this to identify which professional an elevate user has scheduled an appointment with
-- by collecting the calendly user id from the appointment response object
CREATE TABLE users_calendly_users (
 user_id INTEGER NOT NULL REFERENCES users (id),
 calendly_user_id TEXT NOT NULL
);

INSERT INTO users ( email, password, is_admin, first_name, last_name, current_company, hire_date, needs, goals) VALUES
  ('testuser@gmail.com', 'password123', false, 'Test', 'User', 'Google', '2018-06-23', 'Talk to financial advisor about salary/equity negotiations.', 'Increase in equity.'),
  ('admin@gmail.com', 'admin123', true, 'Admin', 'User', '', '2019-06-23', '', ''),
  ('nate@gmail.com', 'nate123', false, 'Nate', 'Lipp', 'Rithm', '2019-06-23', 'Get help from a lawyer.', 'Increase in salary.'),
  ('elie@gmail.com', 'elie123', false, 'Elie', 'Schoppik', 'Rithm', '2017-06-01', 'Talk to financial advisor to calculate how many instructors he can hire.', 'Recruit more instructors.'),
  ('joel@gmail.com', 'joel123', false, 'Joel', 'Burton', 'Rithm', '2017-08-23', 'General investment advice', 'Help bootcamp grads negotiate.');

INSERT INTO google_users (user_id, google_id) VALUES
  ('2','12345');

INSERT INTO salaries (user_id, salary, bonus, equity) VALUES
  (1, 150000.00, 25000.00, .001),
  (2, 100000.00, 5000.00, .005),
  (3, 90000.00, 2000.00, .0035),
  (4, 200000.00, 5000.00, .33),
  (5, 200000.00, 5000.00, .10);

INSERT INTO charges (user_id, amount, description, due_date, payment_date, paid) VALUES
  (1, 500.00, 'Percentage of negotiation salary.', '2019-10-02', null, false),
  (2, 1000.99, 'Percentage of negotiation salary.', '2019-09-01', '2019-08-20', true),
  (3, 500.00, 'Percentage of negotiation salary.', '2019-08-23', null, false),
  (4, 750.00, 'Percentage of negotiation salary.', '2019-11-13', null, false),
  (5, 1000.00, 'Percentage of negotiation salary.', '2019-08-28', null, false);

INSERT INTO questions (user_id, question) VALUES
(1, 'My employer didnt pay me!'),
(2, 'My employer wants to pay me too much!'),
(4, 'How do I negotiate my contract?');

INSERT INTO appointments (user_id, event_id, calendly_user_id, created_at, event_type, event_type_name, reason, admin_notes, start_time, start_time_pretty, end_time, end_time_pretty, location, canceled, canceler_name, cancel_reason, canceled_at, old_event_id, new_event_id) VALUES
  (3, 'BCHFF2F62BWNJVPP', 'ABCFF2F62BWNJVPP', '2020-08-29T09:15:00-07:00', 'One-on-One', '30 Minute Meeting', 'legal advice', null, '2020-08-31T09:15:00-07:00', '09:15 am - Saturday, August 31, 2020', '2020-08-31T09:45:00-07:00','09:45 am - Saturday, August 31, 2020', 'Zoom', false, null, null, null, null, null),
  (3, 'GCIEBYAHGKWNENHS', 'BCHFF2F62BWNJVPP', '2020-08-27T14:00:29-07:00', 'One-on-One', '15 Minute Meeting', 'consult with a lawyer', null, '2020-08-30T14:00:29-07:00','02:00 pm - Friday, August 30, 2020', '2020-08-30T14:15:29-07:00', '02:15 pm - Friday, August 30, 2020', 'Zoom', false, null, null, null, null, null),
  (3, 'AAFOAUQKKVOBSZVD', 'BCHFF2F62BWNJVPP', '2020-08-27T16:30:00-07:00', 'One-on-One', '30 Minute Meeting', 'negotiate my salary', null, '2020-09-02T16:30:00-07:00', '04:30 pm - Moday, September 2, 2020', '2020-09-02T17:00:00-07:00',  '05:00 pm - Moday, September 2, 2020','Zoom', false, null, null, null, null, null),
  (4, 'EGMBBYHHDUZTVUKA', 'BCHFF2F62BWNJVPP', '2020-08-27T12:01:01-07:00', 'One-on-One', '60 Minute Meeting', 'legal advice', null, '2020-08-29T16:30:00-07:00', '04:30 pm - Thursday, August 29, 2020', '2020-08-29T17:30:00-07:00', '04:30 pm - Thursday, August 29, 2020','Zoom', true, 'Emi Tsukuda', 'too many meetings', '2020-08-29T09:15:00-07:00', 'BCHFF2F62BWNJVZZ', null),
  (5, 'FDLGUGK6SOB54B3G', 'BCHFF2F62BWNJVPP', '2020-08-27T14:00:29-07:00', 'One-on-One', '30 Minute Meeting', 'consult with a lawyer', null, '2020-08-30T11:30:00-07:00', '11:30 am - Friday, August 30, 2020','2020-08-30T12:00:00-07:00', '12:00 pm - Friday, August 30, 2020','Zoom', true, 'Stephanie Simms', 'meetings hate em', '2020-08-28T09:15:00-07:00', 'BCHFF2F62BWNJVAA', null);

INSERT INTO users_calendly_users (user_id, calendly_user_id) VALUES
  (1, 'ABCFF2F62BWNJVPP'),
  (2, 'BCHFF2F62BWNJVPP');



-- Create test database with tables

DROP DATABASE IF EXISTS "elevate-test";
CREATE DATABASE "elevate-test";
\c "elevate-test"

ALTER DATABASE "elevate-test" SET timezone='US/Pacific';

CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  reset_password_token TEXT,
  reset_password_expires TEXT,
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
 user_id INTEGER NOT NULL REFERENCES users (id),
 question TEXT NOT NULL,
 response TEXT,
 responder INTEGER REFERENCES users (id),
 resolved BOOLEAN DEFAULT FALSE
);

CREATE TABLE appointments (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  event_id TEXT NOT NULL,
  calendly_user_id TEXT NOT NULL,
  created_at TEXT,
  event_type TEXT,
  event_type_name TEXT,
  reason TEXT,
  admin_notes TEXT DEFAULT NULL,
  start_time TEXT NOT NULL,
  start_time_pretty TEXT NOT NULL,
  end_time TEXT NOT NULL,
  end_time_pretty TEXT NOT NULL,
  location TEXT,
  canceled BOOLEAN NOT NULL,
  canceler_name TEXT,
  cancel_reason TEXT,
  canceled_at TEXT,
  old_event_id TEXT,
  new_event_id TEXT
);

CREATE TABLE users_calendly_users (
 user_id INTEGER NOT NULL REFERENCES users (id),
 calendly_user_id TEXT NOT NULL
);



