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



