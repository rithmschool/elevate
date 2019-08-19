-- seed data for elevate  



-- users table
-- NOTE: users column need more than this, more will be added after meeting with project manager
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 first_name  text NOT NULL, 
last_name text NOT NULL,
phone text NOT NULL UNIQUE,
email  text NOT NULL
);

-- roles table
CREATE TABLE roles (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
admin BOOLEAN NOT NULL DEFAULT false,
coach BOOLEAN NOT NULL DEFAULT false,
financial_advisor BOOLEAN NOT NULL DEFAULT false,
lawyer BOOLEAN NOT NULL DEFAULT false
);

-- appointment table
CREATE TABLE appointments (
id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES users(id) NOT NULL,
professional_id INTEGER REFERENCES users(id) NOT NULL,
date DATE NOT NULL
);

-- charges table
CREATE TABLE charges (
id SERIAL PRIMARY KEY,
appointment_id INTEGER REFERENCES appointments(id) NOT NULL
-- NOTE: client id and professional id may need to be in columns???
-- client_id INTERGER REFERENCES users(id),
-- date DATE NOT NULL
);

-- messages table
CREATE TABLE messages (
id SERIAL PRIMARY KEY,
sent_to INTEGER REFERENCES users(id) NOT NULL,
sent_from INTEGER REFERENCES users(id) NOT NULL,
body text NOT NULL,
sent_at timestamp with time zone NOT NULL,
read_at timestamp with time zone
);

-- templates table
CREATE TABLE templates (
id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES users(id) NOT NULL,
professional_id INTEGER REFERENCES users(id) NOT NULL,
body text NOT NULL
);

INSERT INTO 
users (first_name, last_name, phone, email)
VALUES ('Emi','Tsukuda', '1111111111', 'emi@gamailkdkd.com');

INSERT INTO 
users (first_name, last_name, phone, email)
VALUES ('Marisa', 'Henry', '1111111112', 'marisa@gamailkdkd.com');

INSERT INTO 
roles (user_id)
VALUES (1);

-- Elevate company project database schema and seed data

-- Everyone is a user. Each user can have one default (users_roles.role_id = 5) or multiple roles.
CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  last_login_at timestamp with time zone
);

INSERT INTO users (username, password, first_name, last_name, phone, email, last_login_at) 
VALUES ('testuser', 'password123', 'Test', 'User', '111-111-1111', 'testuser@gmail.com', '8/19/2019'),
       ('stephencurry', 'swish', 'Stephen', 'Curry', '222-222-2222', 'stephencurry@gmail.com', '8/19/2019'),
       ('klaythompson', 'klayklay', 'Klay', 'Thompson', '333-333-3333', 'klay@gmail.com', '8/19/2019');

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_type TEXT NOT NULL
);

INSERT INTO roles VALUES
  (1, 'admin'),
  (2, 'coach'),
  (3, 'financial advisor'),
  (4, 'lawyer'),
  (5, 'user');

-- Join table for users and roles
CREATE TABLE users_roles (
  id SERIAL PRIMARY KEY,
  username TEXT REFERENCES users ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles ON DELETE CASCADE DEFAULT 5
);

INSERT INTO users_roles VALUES
  (1, 'testuser', 1),
  (2, 'testuser', 5),
  (3, 'stephencurry', 3),
  (4, 'klaythompson', 4);

-- Query to get users by role_type
-- SELECT *
-- FROM users JOIN users_roles on users.username = users_roles.username
-- JOIN roles ON users_roles.role_id = roles.id
-- WHERE roles.role_type = 'lawyer';

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  from_username TEXT NOT NULL REFERENCES users,
  to_username TEXT NOT NULL REFERENCES users,
  body TEXT NOT NULL,
  sent_at timestamp with time zone NOT NULL,
  read_at timestamp with time zone
);

INSERT INTO messages VALUES 
(1, 'testuser', 'stephencurry', 'hey steph. how is SF?', '8/8/19', '8/10/2019'),
(2, 'klaythompson', 'stephencurry', 'yo steph. mission bay is a lame commute', '8/9/19', '8/11/2019'),
(3, 'testuser', 'klaythompson', 'i am stuck in traffic', '8/12/19', '8/12/2019');

-- appt_type: {web conference, phone call, text chat}
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL REFERENCES users,
  advisor TEXT NOT NULL REFERENCES users,
  appt_date DATE NOT NULL,
  appt_type TEXT NOT NULL,
  description TEXT
);

CREATE TABLE charges (
  id SERIAL PRIMARY KEY,
  charge_date TIMESTAMP NOT NULL,
  amount INTEGER NOT NULL,
  charge_description TEXT,
  username TEXT NOT NULL REFERENCES users
);

CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  template_id INTEGER REFERENCES templates.id
);

-- Join table for answers from users
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  answer_text TEXT,
  username TEXT REFERENCES users
);

-- Join table for questions and answers
CREATE TABLE questions_answers (
  question_id INTEGER REFERENCES questions.id,
  answer_id INTEGER REFERENCES answers.id
);
